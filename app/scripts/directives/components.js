/**
 * Created by xyj on 27/02/14.
 */
'use strict';
angular.module('directives.components', []);

angular.module('directives.components').directive('afGeneralComponent',
    ['$http', '$templateCache', '$compile', 'afUtils','afComponents', function($http, $templateCache, $compile,afUtils, afComponents){
        return {
            restrict: "AE",
            scope:{
              afdata:"="
            },
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    var componentName = afComponents[scope.afdata.type];
                    if(componentName){
					    $http.get(afUtils.templateUrl.directiveComponent(componentName), {cache: $templateCache}).success(function(tplContent){
							$compile(tplContent)(scope, function(clone, scope){
								iElement.replaceWith(clone);
							});
						});
                    }
                };
            }
        }
    }]);

angular.module('directives.components').directive('afContainer',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            controller: ['$scope','afComponentData','$q', function($scope, afComponentData, $q){
                var deferred = $q.defer();

                if(!$scope.afdata.isLoaded){
                    afComponentData.get({componentId: $scope.afdata.id}, function(data){
                            deferred.resolve(data.data);
                        },
                        function(reason){
                            deferred.reject(reason);
                        });
                }else{
                    deferred.resolve( $scope.afdata.items);
                }

                $scope.newData = deferred.promise;
            }],
            compile:function(tElement, tAttr) {
                tElement.addClass('afcontainer');
                return function(scope , iElement, iAttrs) {
                    scope.newData.then(function(data){
                        scope.afdata.items = data;
                        return data;
                    })
                    .then(function(data){
                        $http.get(afUtils.templateUrl.component('container', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.html(clone);
                            });
                        });
                    });
                }
            }
        }
    }]);

angular.module('directives.components').directive('afContainerArticles',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            controller: ['$scope','afArticles','$q', function($scope, afArticles, $q){
                var deferred = $q.defer();

                if(!$scope.afdata.isLoaded){
                    afArticles.get(null, function(data){
                            deferred.resolve(data.data);
                        },
                        function(reason){
                            deferred.reject(reason);
                        });
                }else{
                    deferred.resolve($scope.afdata.items);
                }

                $scope.newData = deferred.promise;
            }],
            compile:function(tElement, tAttr) {
                tElement.addClass('afcontainer');
                return function(scope , iElement, iAttrs) {
                    scope.newData.then(function(data){
                        scope.afdata.items = data;
                        return data;
                    })
                    .then(function(data){
                        $http.get(afUtils.templateUrl.component('container', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                             $compile(tplContent)(scope, function(clone, scope){
                                 iElement.html(clone);
                             });
                        });
                    });
                }
            }
        }
    }]);

angular.module('directives.components').directive('afCarousel',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            controller: ['$scope','afConfig', function($scope, afConfig){
                $scope.interval = $scope.afdata.data.interval || afConfig.ComponentDefaultOptions.Carousel.Interval;
                $scope.slides = $scope.afdata.data.slides;
            }],
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.component('carousel', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.replaceWith(clone);
                        });
                    });
                }
            }
        }
    }]);

angular.module('directives.components').directive('afArticleBloc',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            controller: ['$scope','afConfig', function($scope, afConfig){
                $scope.data = $scope.afdata.data;
            }],
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.component('articleBloc', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.replaceWith(clone);
                        });
                    });
                }
            }
        }
    }]);

angular.module('directives.components').directive('afHtmlContent',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.component('htmlContent', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.replaceWith(clone);
                        });
                    });
                }
            }
        }
    }]);

angular.module('directives.components').directive('afArticleBuyerConfigBloc',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            controller: ['$scope','afConfig', function($scope, afConfig){
                $scope.data = $scope.afdata.data;
            }],
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.component('articleBuyerConfigBloc', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.replaceWith(clone);
                        });
                    });
                }
            }
        }
    }]);

angular.module('directives.components').directive('afArticleDetailsBloc',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            controller: ['$scope','afConfig','$q', '$routeParams','afArticles', function($scope, afConfig, $q, $routeParams, afArticles){
                var deferred = $q.defer();

                if($routeParams.hasOwnProperty('articleId')){
                    afArticles.get({articleId: $routeParams.articleId}, function(data){
                            deferred.resolve(data);
                        },
                        function(reason){
                            deferred.reject(reason);
                        });
                }else{
                    deferred.resolve({});
                }

                $scope.newData = deferred.promise;
            }],
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    scope.newData.then(function(data){
                        scope.afdata.data = data;
                        angular.forEach(scope.afdata.items, function(value, key){
                            value.data = scope.afdata.data;
                        });
                        return scope.afdata.data;
                    }).then(function(data){
                        //use the same template of container
                        $http.get(afUtils.templateUrl.component('articleDetailsBloc', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.replaceWith(clone);
                            });
                        });
                    });

                }
            }
        }
    }]);


angular.module('directives.components').directive('afSearch',
    ['$http', '$templateCache', '$rootScope', '$compile', 'afUtils', 'afEvents','afConfig','$location','afPage', 'afVars', function( $http, $templateCache, $rootScope, $compile, afUtils, afEvents, afConfig, $location,afPage, afVars){
        return {
            restrict: 'AE',
            scope:{
                afdata:'='
            },
            compile: function(tElement, tAttr) {
                return function(scope, iElement, iAttr) {
                    var self = {};
                    self.resultPage = afPage.pageSearchResult();
					self.currentSearch = afVars.get('currentSearch');
					
					if(self.currentSearch && self.currentSearch['searchId'] ===  scope.afdata.data.searchId){
						scope.afdata.data = angular.copy(self.currentSearch);
						$rootScope.$broadcast(afEvents.SEARCH, {url: afConfig.DefaultSearchUrl, data:scope.afdata.data});
					}

                    scope.originCriteria = angular.copy(scope.afdata.data.criteria);
					
                    scope.reset = function(){
                        scope.afdata.data.criteria = angular.copy(scope.originCriteria);
                    };
					
                    scope.validate = function(){
						afVars.set('currentSearch', angular.copy(scope.afdata.data));
                        if(self.resultPage){
                            if($location.path() === self.resultPage['url']){
                                $rootScope.$broadcast(afEvents.SEARCH, {url: afConfig.DefaultSearchUrl, data:scope.afdata.data});
                            }else{
                                $location.path(self.resultPage['url']);//navigate to search result page
                            }
                        }
                    };
						
				   $http.get(afUtils.templateUrl.component('search', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
						$compile(tplContent)(scope, function(clone, scope){
							iElement.html(clone);
						});
					});
                };
            }
        }
    }]);

angular.module('directives.components').directive('afLocalSearch',
    ['$http', '$templateCache', '$rootScope', '$compile', 'afUtils', 'afEvents','afConfig','$location', function( $http, $templateCache, $rootScope, $compile, afUtils, afEvents, afConfig, $location){
        return {
            restrict: 'AE',
            scope:{
                afdata:'='
            },
            controller: ['$scope','$rootScope', function($scope, $rootScope){
                $scope.q = '';
                $scope.submit = function(){
                    $rootScope.$broadcast(afEvents.LOCAL_SEARCH, {query: $scope.q});
                };
               /* $scope.search = function(query){
                    $rootScope.$broadcast(afEvents.LOCAL_SEARCH, {query: query});
                };*/
            }],
            compile: function(tElement, tAttr) {
                return function(scope, iElement, iAttr) {
                    $http.get(afUtils.templateUrl.component('localSearch', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.html(clone);
                        });
                    });
                };
            }
        }
    }]);


angular.module('directives.components').directive('afSearchResult',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                resultTemplateUrl:'@',
                afdata:"="
            },
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.component('searchResult', scope.resultTemplateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.replaceWith(clone);
                        });
                    });
                }
            }
        }
    }]);

angular.module('directives.components').directive('afDatepicker',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.component('datepicker', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.replaceWith(clone);
                        });
                    });
                }
            }
        }
    }]);


angular.module('directives.components').directive('afDatepickerTemplate',
        ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils){
            return {
				require: "ngModel",
                restrict: "AE",
                scope:{
                  afdata:"="
                },
                compile:function(tElement, tAttr) {
                    return function(scope , iElement, iAttrs, ngModelCtrl) {
                        ngModelCtrl.$formatters.push(function(date) {
							if ( angular.isDefined(date) && date !== null){
								if(!angular.isDate(date)) {
									date = new Date(date);
								}
							}
							return date;
						});
						
						var updateModel = function () {
							scope.$apply(function () {
								var date = iElement.datepicker("getDate");
								iElement.datepicker("setDate", iElement.val());
								ngModelCtrl.$setViewValue(date);
							});
						};
						
						var onSelectHandler = function(userHandler) {
							if ( userHandler ) {
								return function(value, picker) {
									updateModel();
									return userHandler(value, picker);
								};
							} else {
								return updateModel;
							}
						};
						
						var setUpDatePicker = function () {
							var options = scope.$eval(iAttrs.afDatepickerTemplate) || {};
							options.onSelect = onSelectHandler(options.onSelect);
							iElement.bind('change', updateModel);
							iElement.datepicker('destroy');
							iElement.datepicker(options);
							ngModelCtrl.$render();
						};
						
						ngModelCtrl.$render = function () {
							iElement.datepicker("setDate", ngModelCtrl.$viewValue);
						};
						
						scope.$watch(iAttrs.afDatepickerTemplate, setUpDatePicker, true);
                    }
                }
            }
        }]);

angular.module('directives.components').directive('afAccordion',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.component('accordion', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.replaceWith(clone);
                        });
                    });
                }
            }
        }
    }]);
angular.module('directives.components').directive('afList',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.component('list'), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.html(clone);
                        });
                    });
                }
            }
        }
    }]);

angular.module('directives.components').directive('afListItemLink',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.component('listItemLink', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.replaceWith(clone);
                        });
                    });
                }
            }
        }
    }]);
