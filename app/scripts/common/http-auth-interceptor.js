/*global angular:true, browser:true */

/**
 * @license HTTP Auth Interceptor Module for AngularJS
 * (c) 2012 Witold Szczerba
 * License: MIT
 */
(function () {
  'use strict';

  angular.module('http-auth-interceptor', ['af-http-auth-interceptor-buffer'])

  .factory('afAuthService', ['$rootScope','afHttpBuffer', '$http','afEvents', function($rootScope, httpBuffer, $http, afEvents) {
    return {

        login: function(username, password){
            return $http.post('/login', {username: username, password:password});
        },
        logout: function(username, password){
            return $http.get('/logout');
        },

      /**
       * Call this function to indicate that authentication was successfull and trigger a
       * retry of all deferred requests.
       * @param data an optional argument to pass on to $broadcast which may be useful for
       * example if you need to pass through details of the user that was logged in
       */
      loginConfirmed: function(data, configUpdater) {
        var updater = configUpdater || function(config) {return config;};
        $rootScope.$broadcast(afEvents.LOGIN_CONFIRMED, data);
        httpBuffer.retryAll(updater);
      },

      /**
       * Call this function to indicate that authentication should not proceed.
       * All deferred requests will be abandoned or rejected (if reason is provided).
       * @param data an optional argument to pass on to $broadcast.
       * @param reason if provided, the requests are rejected; abandoned otherwise.
       */
      loginCancelled: function(data, reason) {
        httpBuffer.rejectAll(reason);
        $rootScope.$broadcast(afEvents.LOGIN_CANCELED, data);
      }
    };
  }])
      .factory('afHttpInterceptor', ['$rootScope', '$q', 'afHttpBuffer', 'afEvents', function($rootScope, $q, httpBuffer, afEvents) {
          return {
              // optional method
              'request': function(config) {
                  // do something on success
                  return config || $q.when(config);
              },

              // optional method
              'requestError': function(rejection) {
                  // do something on error
                  if (canRecover(rejection)) {
                      return responseOrNewPromise
                  }
                  return $q.reject(rejection);
              },

              // optional method
              'response': function(response) {
                  if(response.data.status){
                      switch(response.data.status){
                          case 200:
                              return response || $q.when(response);
                          case 404:
                              return $q.reject('Resource not found with : 404');
                          default:
                              return $q.reject('Resource not found with : ' + response.data.status);
                      }
                  }else{
                      return response || $q.when(response);
                  }
              },

              // optional method
              'responseError': function(rejection) {
                  if (rejection.status === 401 && !rejection.config.ignoreAuthModule) {
                      var deferred = $q.defer();
                      httpBuffer.append(rejection.config, deferred);
                      $rootScope.$broadcast(afEvents.REQUIRE_LOGIN, rejection);
                      return deferred.promise;
                  }
                  // otherwise, default behaviour
                  return $q.reject(rejection);
              }
          };
      }])
  /**
   * $http interceptor.
   * On 401 response (without 'ignoreAuthModule' option) stores the request
   * and broadcasts 'event:angular-auth-loginRequired'.
   */
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('afHttpInterceptor');
  }]);

  /**
   * Private module, a utility, required internally by 'http-auth-interceptor'.
   */
  angular.module('af-http-auth-interceptor-buffer', [])

  .factory('afHttpBuffer', ['$injector', function($injector) {
    /** Holds all the requests, so they can be re-requested in future. */
    var buffer = [];

    /** Service initialized later because of circular dependency problem. */
    var $http;

    function retryHttpRequest(config, deferred) {
      function successCallback(response) {
        deferred.resolve(response);
      }
      function errorCallback(response) {
        deferred.reject(response);
      }
      $http = $http || $injector.get('$http');
      $http(config).then(successCallback, errorCallback);
    }

    return {
      /**
       * Appends HTTP request configuration object with deferred response attached to buffer.
       */
      append: function(config, deferred) {
        buffer.push({
          config: config,
          deferred: deferred
        });
      },

      /**
       * Abandon or reject (if reason provided) all the buffered requests.
       */
      rejectAll: function(reason) {
        if (reason) {
          for (var i in buffer) {
            buffer[i].deferred.reject(reason);
          }
        }
        buffer = [];
      },

      /**
       * Retries all the buffered requests clears the buffer.
       */
      retryAll: function(updater) {
        for (var i in buffer) {
          retryHttpRequest(updater(buffer[i].config), buffer[i].deferred);
        }
        buffer = [];
      }
    };
  }]);
})();
