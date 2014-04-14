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
            controller: ['$scope','afComponent','$q','afPage', function($scope, afComponent, $q, afPage){
                var deferred = $q.defer();

                if(!$scope.afdata.isLoaded){
                    afComponent.get({pageId: afPage.currentPage().id, componentId: $scope.afdata.id}, function(data){
                        deferred.resolve(data);
                    },
                    function(reason){
                        deferred.reject(reason);
                    });
                }else{
                    deferred.resolve($scope.afdata.data);
                }
                $scope.afdata.data = deferred.promise;
            }],
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    scope.afdata.data.then(function(data){
						scope.afdata.data = data;
                        return scope.afdata.data;
					})
					.then(function(data){
                        var componentName = afComponents[scope.afdata.type];
                        if(componentName){
							$http.get(afUtils.templateUrl.directiveComponent(componentName), {cache: $templateCache}).success(function(tplContent){
								$compile(tplContent)(scope, function(clone, scope){
									iElement.replaceWith(clone);
								});
							});
                        }
                    });
                }
            }
        }
    }]);

angular.module('directives.components').directive('afSearch',
    ['$timeout', '$http', '$templateCache', '$rootScope', '$compile', 'afUtils', 'afEvents','afConfig','$location','afPage', function( $timeout, $http, $templateCache, $rootScope, $compile, afUtils, afEvents, afConfig, $location,afPage){
        return {
            restrict: 'AE',
            scope:{
                afdata:'='
            },
            compile: function(tElement, tAttr) {
                return function(scope, iElement, iAttr) {
                    var self = {};
                    self.resultPage = afPage.pageSearchResult();
                    self.currentPath = $location.path();
                    self.isInited = false;

                    scope.originCriteria = angular.copy(scope.afdata.data.criteria);
                    scope.reset = function(){
                        scope.afdata.data.criteria = angular.copy(scope.originCriteria);
                    };
                    scope.validate = function(){
                        if(self.resultPage){
                            if(self.currentPath === self.resultPage['url']){
                                self.isInited = true;
                                $rootScope.$broadcast(afEvents.SEARCH, {url: afConfig.DefaultSearchUrl, data:scope.afdata.data});
                            }else{
                                self.isInited = false;
                                $location.path(self.resultPage['url']);//navigate to search result page
                            }
                        }
                    };

                    $rootScope.$on('$viewContentLoaded', function(event, data){
                        if( $location.path() === self.resultPage['url']){
                            $rootScope.$broadcast(afEvents.SEARCH, {url: afConfig.DefaultSearchUrl, data:scope.afdata.data});
                        }
                    });


                    $rootScope.$on(afEvents.SEARCH, function(event, data){

                        if(!self.isInited){
                            scope.afdata.data = data.data;
                        }
                    });


					
				   $http.get(afUtils.templateUrl.component('search', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
						$compile(tplContent)(scope, function(clone, scope){
							iElement.html(clone);
						});
					});
                };
            }
        }
    }]);	
	
angular.module('directives.components').directive('afDatepicker',
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
							var options = scope.$eval(iAttrs.afDatepicker) || {};
							options.onSelect = onSelectHandler(options.onSelect);
							iElement.bind('change', updateModel);
							iElement.datepicker('destroy');
							iElement.datepicker(options);
							ngModelCtrl.$render();
						};
						
						ngModelCtrl.$render = function () {
							iElement.datepicker("setDate", ngModelCtrl.$viewValue);
						};
						
						scope.$watch(iAttrs.afDatepicker, setUpDatePicker, true);
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
                    $http.get(afUtils.templateUrl.components('accordion', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.html(clone);
                        });
                    });
                }
            }
        }
    }]);

angular.module('directives.components').directive('afCarrousel',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.components('carrousel', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.html(clone);
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
