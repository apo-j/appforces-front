
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
                    iElement.text(scope.afdata.Label);
                    scope.href = 'javascript:void(0)';

                    if(scope.afdata.Url.indexOf(afEnums.NavigationType.outer) == 0){//permit right click of mouse on the outerbound link
                        scope.href = afUtils.getUrl(scope.afdata.Url, {pattern: afEnums.NavigationType.outer, content:''});
                    }else if(scope.afdata.Url.indexOf(afEnums.NavigationType.inner) == 0){//permit right click of mouse on the innerbound link
                        scope.href = afUtils.getUrl(scope.afdata.Url, {pattern: afEnums.NavigationType.inner, content:''});
                    }else if(scope.afdata.Url.indexOf(afEnums.NavigationType.content) == 0){
                        scope.criteria = angular.copy(scope.afdata.criteria);

                        var current = afPage.getPage(afPage.currentPage().Id);
                        if(current){
                            angular.forEach(current.Data.Criteria, function(c){
                                scope.criteria.push(c);
                            })
                        }

                    }

                    iElement.attr('href', scope.href);

                    iElement.on('click', function(event){
                        if(scope.afdata.Url.indexOf(afEnums.NavigationType.content) == 0){
                            $rootScope.$broadcast(afEvents.RELOAD_PAGE_BODY, {url:afConfig.DefaultSearchUrl, params:scope.criteria});
                        }else{
                            afNavigation.navigateTo({href: scope.afdata.Url, target: scope.afdata.Target});
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
    ['$http', '$templateCache', '$compile', 'afUtils',  function($http, $templateCache, $compile, afUtils){
        return {
            restrict: 'AE',
            scope:{
                position:'=',
                afdata:'='
            },
            controller: ['$scope', 'afPage', 'afSidebar', '$q', 'afEnums', function($scope, afPage, afSidebar, $q, afEnums){
                var deferred = $q.defer();

                if(!!$scope.afdata && $scope.afdata.length > 0){
                    deferred.resolve($scope.afdata);
                }else{
                    deferred.reject(null);
                }

                $scope.newData = deferred.promise;
            }],
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    scope.newData.then(function(data){
                        scope.afdata = data;
                        return scope.afdata;
                    }).then(function(data){
                       scope.afdata.css += scope.position == 0 ? ' left ' : 'right';
                       $http.get(afUtils.templateUrl.sidebar(data.TemplateUrl), {cache: $templateCache}).success(function(tplContent){
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
            controller: ['$scope','afEventRegister', function($scope, afEventRegister){
                $scope.afdata.Items = $scope.afdata.Center;
                $scope.afdata.Center = null;
                //register on page reload event
                afEventRegister.registerOnPageReload($scope);
            }],
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    //container
                    scope.$watch('afdata', function(value){
                        $http.get(afUtils.templateUrl.page(value.TemplateUrl), {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.replaceWith(clone);
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
                            $http.get(afUtils.templateUrl.component('localSearchContainer', scope.afdata.TemplateUrl), {cache: $templateCache}).success(function(tplContent){
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

angular.module('directives').directive('afScripts',
    ['$rootScope', '$http', '$templateCache', '$compile', 'afUtils','afEvents', function($rootScope, $http, $templateCache, $compile, afUtils, afEvents){
        return {
            restrict: 'AE',
            scope:{
                afdata:'='
            },
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    scope.$on(afEvents.VIEW_CONTENT_LOADED, function(dd) {
                        angular.forEach(scope.afdata.data.scripts, function(value, key){
                           /* var script = document.createElement('script');
                            script.src = value;
                            document.getElementsByTagName('body')[0].appendChild(script);*/
                           angular.element('<script src=\"' + value + '\"></script>').appendTo(iElement);
                        });
                    })
                };
            }
        }
    }]);

/************************Side bar*********************************/
angular.module('directives').directive('afBottom',
    ['$http', '$templateCache', '$compile', 'afUtils',  function($http, $templateCache, $compile, afUtils){
        return {
            restrict: 'AE',
            controller: ['$scope', 'afPage', '$q', 'afEnums','afBottom', function($scope, afPage, $q, afEnums, afBottom){
                var deferred = $q.defer();
                var currentPage = afPage.currentPage();
                if(!!currentPage && (currentPage.layout & afEnums.layout.Bottom) > 0){
                    afBottom.get({pageId: afPage.currentPage().id}, function(data){
                            deferred.resolve(data);
                        },
                        function(reason){
                            deferred.reject(reason);
                        });
                }else{
                    deferred.reject(null);
                }

                $scope.newData = deferred.promise;
            }],
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    scope.newData.then(function(data){
                        scope.afdata = data;
                        return scope.afdata;
                    }).then(function(data){
                        $http.get(afUtils.templateUrl.bottom(data.TemplateUrl), {cache: $templateCache}).success(function(tplContent){
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