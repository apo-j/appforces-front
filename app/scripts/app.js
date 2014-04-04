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
	var _p404Url = afConfig.DefaultPageUrl.P404;
    for(var i = 0, j = afConfig.AppConfig.pages.length; i < j; i++){
       var _page = afConfig.AppConfig.pages[i];
	   
	   if(_page.type == afEnums.pageType.p404){
			_p404Url = _page.url;
	   }
	   
       $routeProvider.when(_page['url'], {
                templateUrl: 'views/' + _page['layoutUrl'] + '.html',
                controller: _page['ctrl'] || 'NavigationCtrl',
                resolve:{
                    page: ['afPage', function(afPage){
                        afPage.setCurrentPage();
                       //TODO verify if this page needs authentication before open it
                       /* var _p = afPage.currentPage();
                        if(_p){
                             return afPage.pageData().get({appId: afConfig.AppConfig.appId, pageId: _p.id}).$promise;
                        }*/
                    }]
                }
            });
    };

    $routeProvider.otherwise({
        redirectTo: _p404Url
    });
  }])
    .run(['$rootScope','$location','afPage','afEvents','afConfig', function($rootScope,$location, afPage, afEvents, afConfig){
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
    }]);
