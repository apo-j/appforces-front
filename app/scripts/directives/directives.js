/**
 * Created by xyj on 03/01/14.
 */
'use strict';
angular.module('directives', []);
//header
angular.module('directives').directive( 'afHeader',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils) {
        return {
            restrict: 'AE',
            scope: false,
            controller: ['$scope', 'afHeader','afPage', function($scope, afHeader, afPage){
                $scope.header = afHeader.get({pageId: afPage.currentPage().id}).$promise;
            }],
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    scope.header.then(function(data){
                        scope.header = data;
                        return scope.header;
                    }).then(function(data){
                        $http.get(afUtils.templateUrl.header(data.templateUrl), {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                $(iElement).replaceWith(clone);
                            });
                        });
                    });
                }
            }
        };
    }]);

angular.module('directives').directive( 'afHeaderTop',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils) {
        return {
            restrict: 'AE',
            scope:{
                afdata:"="
            },
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.headerTop(scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            $(iElement).replaceWith(clone);
                        });
                    });
                }
            }
        };
    }]);

angular.module('directives').directive( 'afMenu',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils) {
        return {
            restrict: 'AE',
            scope:{
                afdata:"="
            },
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.headerMenu(scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            $(iElement).replaceWith(clone);
                        });
                    });
                }
            }
        };
    }]);

angular.module('directives').directive('afNavbar',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils){
        return {
            restrict: 'AE',
            scope:{
                afdata:'='
            },
            compile: function(tElement, tAttr) {
                return function(scope, iElement, iAttr) {
                    $http.get(afUtils.templateUrl.headerNavbar(scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            $(iElement).replaceWith(clone);
                        });
                    });
                };
            }
        }
    }]);

angular.module('directives').directive('afNavbarItem',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils){
        return {
            restrict: 'AE',
            scope:{
              items:'=',
              templateUrl:'=',
			  isRoot:'='
            },
            controller: ['$scope', 'afPage','$location', 'afUtils','afConfig', function($scope, afPage, $location, afUtils, afConfig){
                $scope.isCurrent = function(url){
                    if($scope.isRoot && url){
                        var _currentLocation = afPage.currentPage().url;
                        if(_currentLocation === '/' && url === '/'){//index page
                            return true;
                        }else if(_currentLocation !== '/' && url !== '/' && _currentLocation.indexOf(url) === 0){//others pages
                            return true;
                        }
                    }
                    return false;
                };
                $scope.getUrl = function(url){
                    return afUtils.makeUrl(url, null, afConfig.LocationMode);
                }

            }],
            compile: function(tElement, tAttr) {
                return function(scope, iElement, iAttr) {
                    $http.get(afUtils.templateUrl.headerMenuComponents(scope.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                             iElement.append(clone);
                        });
                    });
                };
            }
        }
    }]);

angular.module('directives').directive('afLink',
    ['afUtils', 'afNavigation','afEnums', function(afUtils, afNavigation, afEnums){
        return {
            restrict: 'AE',
            scope:{
                afHref:'@',
                afTarget:'@'
            },
            compile: function(tElement, tAttr) {
                return function(scope, iElement, iAttr) {
					var href = 'javascript:void(0)';
					
					if(scope.afHref.indexOf(afEnums.NavigationType.outer) == 0){//permit right click of mouse on the outerbound link
						href = afUtils.getUrl(scope.afHref, {pattern: afEnums.NavigationType.outer, content:''});
					}
					
					if(scope.afHref.indexOf(afEnums.NavigationType.inner) == 0){//permit right click of mouse on the outerbound link
						href = afUtils.getUrl(scope.afHref, {pattern: afEnums.NavigationType.inner, content:''});
					}
					
					iElement.attr('href', href);
					
                    iElement.on('click', function(event){
                        afNavigation.navigateTo({href: scope.afHref, target: scope.afTarget});
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
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils){
        return {
            restrict: 'AE',
            scope:{
                position:'='
            },
            controller: ['$scope', 'afPage', 'afSidebar', function($scope, afPage, afSidebar){
                $scope.sidebar = afSidebar.get({pageId: afPage.currentPage().id, position: $scope.position}).$promise;
            }],
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    scope.sidebar.then(function(data){
                        scope.sidebar = data;
                        return scope.sidebar;
                    }).then(function(data){
                        var tplUrl = data.templateUrl;
                        $http.get('/partials/sidebar/' + tplUrl + '.html', {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.replaceWith(clone);
                            });
                        });
                    });

                }
            }
        }
    }]);
	
angular.module('directives').directive('afPageBody',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils){
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
                    $http.get(afUtils.templateUrl.page(scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.replaceWith(clone);
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



angular.module('directives').directive('afRow',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils){
        return {
            restrict: 'AE',
            scope:{
               afdata:'='
            },
            templateUrl: '/partials/row.html'
        }
    }]);

	



