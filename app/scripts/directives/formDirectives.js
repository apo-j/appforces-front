/**
 * Created by Pluto on 6/11/2014.
 */

/**
 * Created by xyj on 10/06/2014.
 */

'use strict';
angular.module('directives.form', []);

angular.module('directives.form').directive('afForm',
    ['$http', '$templateCache', '$compile', 'afUtils', 'afEvents', function($http, $templateCache, $compile,afUtils, afEvents){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            controller: ['$scope', function($scope){
                $scope.submit = function(){
                    alert($scope.afdata.data.action);
                }

                $scope.reset = function(){
                    $scope.$broadcast(afEvents.RESET_FORM);
                }
            }],
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                        $http.get(afUtils.templateUrl.component('form', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.replaceWith(clone);
                            });
                        })
                };
            }
        }
    }]);

angular.module('directives.form').directive('afFormItem',
    ['$http', '$templateCache', '$compile', 'afUtils', 'afEnums', 'afEvents', function($http, $templateCache, $compile, afUtils, afEnums, afEvents){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            controller: ['$scope', function($scope){
                $scope.originalValue = $scope.afdata.data.value;

                $scope.$on(afEvents.RESET_FORM, function(event, data){
                    $scope.afdata.data.value = $scope.originalValue;
                });
            }],
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    var formItemType = afEnums.FormItemTypeEnums[scope.afdata.data.type]
                    if(formItemType){
                        $http.get(afUtils.templateUrl.formItem(formItemType), {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.replaceWith(clone);
                            });
                        });
                    }
                }
            }
        }
    }]);


