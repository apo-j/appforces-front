/**
 * Created by Pluto on 1/2/14.
 */
'use strict';
angular.module('services', ['ngResource']);

angular.module('services').factory('afHeader', ['$resource','afConfig',
    function($resource, afConfig){
        return $resource('api/headers/:appId/:pageId.json', {appId: afConfig.AppConfig.appId});
    }]);

angular.module('services').factory('afHeaderFetcher', ['$resource','afConfig','$q','$timeout',
    function($resource, afConfig, $q, $timeout){
        var _r = $resource('api/headers/:appId/:pageId.json', {appId: afConfig.AppConfig.appId});

        var getHeader = function(pageId){
            var deferred = $q.defer();
           /* _r.get({pageId: pageId}, function(data){
                deferred.resolve(data);
            }, function(reason){});*/

            $timeout(function() {
                deferred.resolve(["Hello", "world"]);
            }, 2000);

            return deferred.promise;
        };

        return {
            getMessages: getHeader
        };

    }]);

angular.module('services').factory('afSidebar', ['$resource','afConfig',
    function($resource, afConfig){
        return $resource('api/sidebars/:appId/:pageId/:position.json', {appId: afConfig.AppConfig.appId});
    }]);

angular.module('services').factory('afComponent', ['$resource','afConfig',
    function($resource, afConfig){
        return $resource('api/components/:appId/:componentId.json', {appId: afConfig.AppConfig.appId});
    }]);

//
/*angular.module('services').provider('afNavigationState',
    function(){
        var self = this;
        self._states  = [];

        self.initStates = function(states){
            self._states = states || [];
        },
        self.$get = ['$location','afUtils', function($location, afUtils) {
                return {
                    currentState:function(){
                        var match = afUtils.Collection.find(self._states, function(state){
                            return $location.path().toLowerCase() ===  (state.url || '/').toLowerCase();
                        });

                       return match ? match : null;//{state: 'index', url:'/'};
                    }
                };
            }]

    });*/

//page
angular.module('services').factory('afPage',['afConfig','$resource','$cacheFactory','afUtils','$location',
    function(afConfig, $resource, $cacheFactory, afUtils, $location){
        var self = {};
        self.cache = $cacheFactory('lrucache', {
            capacity: 100
        });
        self.indexPage = function(){
            return afUtils.Collection.find(afConfig.AppConfig.pages, function(item){
                return item.isIndexPage || false;
            });
        };
        self.currentPage = function(){
            return afUtils.Collection.find(afConfig.AppConfig.pages, function(page){
                return $location.path().toLowerCase() ===  (page.url || '/').toLowerCase();
            });
        };

        self.pageData = function(){
            return $resource('api/pages/:appId/:pageId.json');//, {get:{cache: self.cache}});
        }

        self.pageTitle = function(){
            return (self.currentPage()? self.currentPage().title : null) || afConfig.AppConfig.appName || afConfig.AppName;
        };

        return self;
    }]);

//configuration
angular.module('services').provider('afNavigationStateManager',
    [function(){
        var self = this;
        self._states  = [];
        self._currentIndex = -1;
        self.$get = ['$location','afUtils', function($location, afUtils) {
            return {
                push:function(state){
                    self._states.push(state);
                    self._currentIndex++;
                    return state;
                },
                pop:function(){
                    if(self._states.length > 0){
                        var res = self._states[self._currentIndex];
                        self._currentIndex--;
                        self._states = self._states.slice(0, _currentIndex);
                        return res;
                    }
                    return null;
                },
                current:function(){
                    if(self._currentIndex >= 0){
                        return self._states[self._currentIndex];
                    }
                    return null;
                },
                currentState:function(){
                    var match = afUtils.Collection.find(self._states, function(state){
                        return $location.path().toLowerCase() ===  (state.url || '/').toLowerCase();
                    });

                    return match ? match.state : null;
                }
            };
        }];
    }]);
