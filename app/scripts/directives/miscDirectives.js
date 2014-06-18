
'use strict';
angular.module('directives.miscellaneous', [])

angular.module('directives.miscellaneous').directive('afLink',
    ['$rootScope','afUtils', 'afNavigation','afEnums','afPage','afEvents','afConfig', function($rootScope, afUtils, afNavigation, afEnums, afPage,afEvents, afConfig){
        return {
            restrict: 'AE',
            scope:{
                afdata:'='
            },
            compile: function(tElement, tAttr) {
                return function(scope, iElement, iAttr) {
                    iElement.text(scope.afdata.label);
                    scope.href = 'javascript:void(0)';

                    if(scope.afdata.url.indexOf(afEnums.NavigationType.outer) == 0){//permit right click of mouse on the outerbound link
                        scope.href = afUtils.getUrl(scope.afdata.url, {pattern: afEnums.NavigationType.outer, content:''});
                    }else if(scope.afdata.url.indexOf(afEnums.NavigationType.inner) == 0){//permit right click of mouse on the innerbound link
                        scope.href = afUtils.getUrl(scope.afdata.url, {pattern: afEnums.NavigationType.inner, content:''});
                    }else if(scope.afdata.url.indexOf(afEnums.NavigationType.content) == 0){
                        scope.criteria = angular.copy(scope.afdata.criteria);

                        var current = afPage.getPage(afPage.currentPage().id);
                        if(current){
                            angular.forEach(current.data.criteria, function(c){
                                scope.criteria.push(c);
                            })
                        }

                    }

                    iElement.attr('href', scope.href);

                    iElement.on('click', function(event){
                        if(scope.afdata.url.indexOf(afEnums.NavigationType.content) == 0){
                            $rootScope.$broadcast(afEvents.RELOAD_PAGE_BODY, {url:afConfig.DefaultSearchUrl, params:scope.criteria});
                        }else{
                            afNavigation.navigateTo({href: scope.afdata.url, target: scope.afdata.target});
                        }

                        return false;
                    });
                };
            }
        }
    }]);


angular.module('directives').directive('afLocalSearchLink',
    ['afUtils', 'afEvents','$rootScope', function(afUtils, afEvents, $rootScope){
        return {
            restrict: 'AE',
            compile: function(tElement, tAttr) {
                return function(scope, iElement, iAttr) {
                    iElement.on('click', function(){
                        $rootScope.$broadcast(afEvents.LOCAL_SEARCH, {query: iAttr.keywords});
                    });
                };
            }
        }
    }]);


/************************Side bar*********************************/
angular.module('directives').directive('afSidebar',
    ['$http', '$templateCache', '$compile', 'afUtils', 'afComponents',  function($http, $templateCache, $compile, afUtils, afComponents){
        return {
            restrict: 'AE',
            scope:{
                position:'='
            },
            controller: ['$scope', 'afPage', 'afSidebar', '$q', function($scope, afPage, afSidebar, $q){
                var deferred = $q.defer();
                var currentPage = afPage.currentPage();
                if(!!currentPage && (($scope.position == 0 && (currentPage.layout & 4) > 0) ||($scope.position == 1 && (currentPage.layout & 8) > 0))){
                    afSidebar.get({pageId: afPage.currentPage().id, position: $scope.position}, function(data){
                            deferred.resolve(data);
                        },
                        function(reason){
                            deferred.reject(reason);
                        });
                }else{
                    deferred.reject(null);
                }

                $scope.newData = deferred.promise;
                //$scope.afdata = afSidebar.get({pageId: afPage.currentPage().id, position: $scope.position}).$promise;
            }],
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    scope.newData.then(function(data){
                        scope.afdata = data;
                        return scope.afdata;
                    }).then(function(data){
                       scope.afdata.css += scope.position == 0 ? ' left ' : 'right';
                       $http.get(afUtils.templateUrl.sidebar(data.templateUrl), {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.replaceWith(clone);
                            });
                        });
                    },function(){
                        iElement.remove();
                    });

                }
            }
        }
    }]);

angular.module('directives').directive('afPageBody',
    ['$http', '$templateCache', '$compile', 'afUtils','afComponents', function($http, $templateCache, $compile, afUtils, afComponents){
        return {
            restrict: 'AE',
            scope:{
                afdata:'='
            },
            controller: ['$scope', 'afPage', 'afEvents', 'afData','afEventRegister', function($scope, afPage, afEvents, afData, afEventRegister){
                $scope.afdata = $scope.afdata || {};

                //register on page reload event
                afEventRegister.registerOnPageReload($scope);
            }],
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    //container
                    scope.$watch('afdata', function(value){
                        $http.get(afUtils.templateUrl.directiveComponent(afComponents['10']), {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.html(clone);
                            });
                        });
                    });
                }
            }
        }
    }]);


angular.module('directives').directive('afLocalSearchContainer',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils){
        return {
            restrict: 'AE',
            scope:{
                afdata:'='
            },
            controller: ['$scope','afEventRegister', function($scope, afEventRegister){
                afEventRegister.registerOnLocalSearch($scope);
            }],
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    scope.$watch('results', function(value){
                        if(angular.isArray(value)){
                            $http.get(afUtils.templateUrl.component('localSearchContainer', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                                $compile(tplContent)(scope, function(clone, scope){
                                    iElement.html(clone);
                                });
                            });
                        }
                    });
                }
            }
        }
    }]);