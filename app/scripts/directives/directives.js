/**
 * Created by xyj on 03/01/14.
 */
'use strict';
angular.module('directives', []);

angular.module('directives').directive( 'afHeader',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils) {
        return {
            restrict: 'AE',
            scope: false,
            controller: ['$scope', 'afHeader','afPage', function($scope, afHeader, afPage){
                $scope.header = afHeader.get({pageId: afPage.currentPageData().id}).$promise;
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
                                //iElement.html(clone);
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
                position:'='
            },
            controller: ['$scope', 'afPage', 'afSidebar', function($scope, afPage, afSidebar){
                $scope.sidebar = afSidebar.get({pageId: afPage.currentPageData().id, position: $scope.position}).$promise;
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


