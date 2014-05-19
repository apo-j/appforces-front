

'use strict';
angular.module('directives.navDirectives', [])

angular.module('directives.navDirectives').directive( 'afHeader',
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
