'use strict';
angular.module('controllers', []);
angular.module('filters', []);


angular.module("appForce", [
  'ngCookies',
  'ngResource',
  //'ngSanitize',
  'ngRoute',
  'controllers',
  'services',
  'filters',
  'directives',
  'directives.components',
  'ui.bootstrap',
  //'content-mocks',
  'http-auth-interceptor'
])
  .constant('afUtils', Utils)
  .constant('afConfig', Configuration)
  .constant('afEnums', Enums)
  .constant('afEvents', Events)
  .constant('afComponents', Components)
  .config(['$routeProvider','afConfig','afEnums', function ($routeProvider, afConfig, afEnums) {
    //set the default 404 page
    //this would be overridden if
    //a custom 404 page has been defined
    $routeProvider.when('/404', {
        templateUrl: 'views/404.html'
    });

     //set the default 500 page
     //this would be overridden if
     //a custom 500 page has been defined
     $routeProvider.when('/500', {
         templateUrl: 'views/500.html'
     });


    for(var i = 0, j = afConfig.AppConfig.pages.length; i < j; i++){
       var _page = afConfig.AppConfig.pages[i];

       $routeProvider.when(_page['url'], {
                templateUrl: 'views/' + _page['layoutUrl'] + '.html',
                controller: _page['ctrl'] || 'NavigationCtrl',
                resolve:{
                    page: ['afPage', function(afPage){
                       //TODO verify if this page needs authentication before open it
                        var _p = afPage.setCurrentPage();
                        if(_p){
                             return afPage.pageData().get({appId: afConfig.AppConfig.appId, pageId: _p.id}).$promise;
                        }
                    }]
                }
            });
    };

    $routeProvider.otherwise({
        redirectTo: afConfig.DefaultPageUrl.P404
    });
  }])
    .run(['$rootScope','$location','afPage','afEvents','afConfig','$log', function($rootScope,$location, afPage, afEvents, afConfig, $log){
        //Register global events Listeners
        $rootScope.$on(afEvents.REQUIRE_LOGIN, function() {
            $rootScope.prevState = $rootScope.prevState || (afPage.currentPage()? afPage.currentPage().url : '/');
            $location.path(afPage.pageSignin() || afConfig.DefaultPageUrl.Psignin);
        });
        $rootScope.$on(afEvents.LOGIN_CONFIRMED, function() {
            if($rootScope.prevState){
                var url = $rootScope.prevState;
                $rootScope.prevState = null;
                $location.path(url);
            }
        });
        //Register the events listeners of errors
        $rootScope.$on(afEvents.NAV_ERR, function(event, data) {
            $log.error(angular.toJson(angular.extend(event, data),true));
        });
    }]);
