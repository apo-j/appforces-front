'use strict';
angular.module('controllers', []);
angular.module('filters', []);


angular.module("appForce", [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'controllers',
  'services',
  'filters',
  'directives',
  'ui.bootstrap',
  'content-mocks',
  'http-auth-interceptor'
])
  .constant('_Utils', Utils)
  .constant('afLunr', lunr)
  .constant('afConfig', Configuration)
  .constant('afEnums', Enums)
  .constant('afEvents', Events)
  .constant('afComponents', Appforces.Components)
  .constant('afWorkflowList', Workflow)
  .config(['afUtilsProvider', '_Utils', function(afUtilsProvider, _Utils){
	afUtilsProvider.initUtils(_Utils);
  }])
  .config(['$routeProvider','afConfig', function ($routeProvider, afConfig) {

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

     angular.forEach(afConfig.AppConfig.pages, function(page, key){
         $routeProvider.when(page['url'], {
             templateUrl: 'views/' + (page['layoutUrl'] || 'main') + '.html',
             controller: page['ctrl'] || 'NavigationCtrl',
             resolve:{
                 page: ['afPage', 'afData', function(afPage, afData){
                     //TODO verify if this page needs authentication before open it
                     var _p = afPage.setCurrentPage();
                     if(_p){
                         return afPage.currentPageData();//afData.get(_p.id + '.json');
                         //return afPage.pageData().get({appId: afConfig.AppConfig.appId, pageId: _p.id}).$promise;
                     }
                 }]
             }
         });
     });


   /* angular.forEach(afConfig.AppConfig.workflow, function(workflow, key){
        //register workflow route
        $routeProvider.when(workflow['url'], {
            templateUrl: 'views/' + workflow['layoutUrl'] + '.html',
            controller: workflow['ctrl'] || 'NavigationCtrl',
            resolve:{
                page: ['afPage', 'afData', function(afPage, afData){
                    //TODO verify if this page needs authentication before open it
                    var _p = afPage.setCurrentPage();
                    if(_p){
                        return afPage.workflowData(_p.id);//afData.get(_p.id + '.json');
                        //return afPage.pageData().get({appId: afConfig.AppConfig.appId, pageId: _p.id}).$promise;
                    }
                }]
            }
        });
    });*/

    $routeProvider.otherwise({
        redirectTo: afConfig.DefaultPageUrl.P404
    });
  }])
    .run(['$rootScope','$location','afPage','afEvents','afConfig','$log', 'afDocsSearch', 'afArticles', function($rootScope, $location, afPage, afEvents, afConfig, $log,afDocsSearch, afArticles){
        //get all articles
        /*if(afConfig.AppConfig.isLocalSearchActivated){
             afArticles.get(null, function(data){
                 afDocsSearch.init(afConfig.AppConfig.localSearchOptions, data.data);
             });
         };*/



        //transfer global angular events
        $rootScope.$on('$viewContentLoaded', function() {
            $rootScope.$broadcast(afEvents.VIEW_CONTENT_LOADED);
        });



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
		//Register the events listeners of errors
		$rootScope.$on(afEvents.ERROR, function(event, data) {
            $log.error(angular.toJson(angular.extend(event, data),true));
        });
    }]);
