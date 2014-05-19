
'use strict';
angular.module('directives.miscellaneous', [])

angular.module('directives.miscellaneous').directive('afLink',
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
                    $http.get(afUtils.templateUrl.directiveComponent(afComponents['10']), {cache: $templateCache}).success(function(tplContent){
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
