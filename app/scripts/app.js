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
  .config(['$routeProvider','afConfig', function ($routeProvider, afConfig) {
    for(var i = 0, j = afConfig.AppConfig.pages.length; i < j; i++){
       var _page = afConfig.AppConfig.pages[i];
       $routeProvider.when(_page['url'], {
                templateUrl: 'views/' + _page['layoutUrl'] + '.html',
                controller: _page['ctrl'] || 'NavigationCtrl',
                resolve:{
                    page: ['afPage', function(afPage){
                            var _p = afPage.currentPage();
                            if(_p){
                                return afPage.pageData().get({appId: afConfig.AppConfig.appId, pageId: _p.id}).$promise;
                            }
                    }]
                }
            });
    };
   /* $routeProvider.when('/404', {
       templateUrl: '404.html'
    });*/

    $routeProvider.otherwise({
        redirectTo: '404'
    });
  }])
    .run(['$rootScope','$location','afPage','afEvents', function($rootScope,$location, afPage, afEvents){
        $rootScope.$on(afEvents.REQUIRE_LOGIN, function() {
            $rootScope.prevState = $rootScope.prevState || (afPage.currentPage()? afPage.currentPage().url : '/');
            $location.path('/signin');
        });
        $rootScope.$on(afEvents.LOGIN_CONFIRMED, function() {
            if($rootScope.prevState){
                var url = $rootScope.prevState;
                $rootScope.prevState = null;
                $location.path(url);
            }

        });
    }]);
