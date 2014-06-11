/**
 * Created by Pluto on 6/11/2014.
 */

/**
 * Created by xyj on 10/06/2014.
 */

'use strict';
angular.module('directives.form', []);

angular.module('directives.workflow').directive('afForm',
    ['$http', '$templateCache', '$compile', 'afUtils','afWorkflowList', function($http, $templateCache, $compile,afUtils, afWorkflowList){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    var workflow = afWorkflowList[scope.afdata.data.type];
                    if(workflow){
                        $http.get(afUtils.templateUrl.workflow(workflow), {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.replaceWith(clone);
                            });
                        });
                    }
                };
            }
        }
    }]);

/*angular.module('directives.components').directive('afPaymentFlow',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            controller: ['$scope', function($scope){
                //payment workflow logic here
                $scope.currentStep = 0;
                $scope.totalSteps = $scope.afdata.steps.length;
                $scope.prevStep = function(){
                    if($scope.currentStep > 0){
                        $scope.currentStep--;
                    }
                };
                $scope.nextStep = function(){
                    if($scope.currentStep < $scope.totalSteps - 1){
                        $scope.currentStep++;
                    }
                };

                $scope.terminate = function(){
                    alert('ok');
                }
            }],
            compile:function(tElement, tAttr) {
                tElement.addClass('afworkflow');
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.workflow('payment', scope.afdata.templateUrl), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.html(clone);
                        });
                    });

                }
            }
        }
    }]);*/


