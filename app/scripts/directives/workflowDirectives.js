/**
 * Created by xyj on 10/06/2014.
 */

'use strict';
angular.module('directives.workflow', []);

angular.module('directives.workflow').directive('afWorkflow',
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
                        $http.get(afUtils.templateUrl.workflow(workflow.code), {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.replaceWith(clone);
                            });
                        });
                    }
                };
            }
        }
    }]);


angular.module('directives.workflow').directive('afWorkflowLauncher',
    ['afWorkflowList','$location', function(afWorkflowList, $location){
        return {
            restrict: "AE",
            scope:{
                wfType:'@'
            },
            link:function(scope , iElement, iAttrs) {
                iElement.on('click', function(){
                    var workflow = afWorkflowList[scope.wfType]
                    if(workflow){
                        scope.$apply( function(){
                            $location.path(workflow.url);//to other page of the same site
                        });
                    }
                })
            }
        }
    }]);



angular.module('directives.components').directive('afPaymentFlow',
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
    }]);
