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
    ['$http', '$templateCache', '$compile', 'afUtils','afConfig', 'afNavigation','afEnums', function($http, $templateCache, $compile, afUtils, afConfig, afNavigation, afEnums){
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
            controller: ['$scope', 'afPage', 'afEvents', 'afData', function($scope, afPage, afEvents, afData){
                $scope.afdata = $scope.afdata || {};
				$scope.$on(afEvents.RELOAD_PAGE_BODY, function(event, data){
                    afData.get(data.url, data.params).success(function(pageData){
                        $scope.afdata = pageData;
                    });
				});
				
				$scope.$on(afEvents.SEARCH, function(event, data){
                    if(data.searchId === $scope.afdata.searchId){
                        afData.post(data.url, data.data).success(function(pageData){
                            $scope.afdata = pageData;
                        });
                    }
				});
            }],
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    scope.$watch('afdata', function(v){
                        var tplUrl = scope.afdata.templateUrl;
                        $http.get('/partials/' + tplUrl + '.html', {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.html(clone);
                            });
                        });
                    });
                }
            }
        }
    }]);	



