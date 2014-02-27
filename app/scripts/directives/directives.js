/**
 * Created by xyj on 03/01/14.
 */
'use strict';
angular.module('directives', []);

angular.module('directives').directive( 'afHeader',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils) {
        return {
            restrict: 'AE',
            scope:{
                currentPage:'='
            },
            controller: ['$scope', 'afHeader', function($scope, afHeader){
                $scope.header = afHeader.get({pageId: $scope.currentPage.id}).$promise;
            }],
            compile: function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    scope.header.then(function(data){
                        scope.header = data;
                        return scope.header;
                    }).then(function(data){
                        $http.get(afUtils.templateUrl.header(data.templateUrl), {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.html(clone);
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
                            iElement.html(clone);
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
                            iElement.html(clone);
                        });
                    });
                }
            }
        };
    }]);

angular.module('directives').directive('afNavbarItem',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils){
        return {
            restrict: 'AE',
            scope:{
              items:'=',
              templateUrl:'='
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


/************************Side bar*********************************/
angular.module('directives').directive('afSidebar',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils){
        return {
            restrict: 'AE',
            scope:{
                position:'=',
                currentPage:'='
            },
            controller: ['$scope', 'afSidebar', function($scope, afSidebar){
                $scope.sidebar = afSidebar.get({pageId: $scope.currentPage.id, position: $scope.position}).$promise;
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
                                iElement.html(clone);
                            });
                        });
                    });

                }
            }
        }
    }]);


