/**
 * Created by xyj on 10/06/2014.
 */

'use strict';
angular.module('directives.workflow', []);

angular.module('directives.workflow').directive('afWorkflow',
    ['$http', '$templateCache', '$compile', 'afUtils','afWorkflowManager', function($http, $templateCache, $compile,afUtils, afWorkflowManager){
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

angular.module('directives.workflow').directive('afWorkflowLauncher',
    ['$http', '$templateCache', '$compile', 'afUtils','afWorkflowList', function($http, $templateCache, $compile,afUtils, afWorkflowList){
        return {
            restrict: "AE",
            scope:{
                wfCode:"@"
            },
            controller:['$scope', function($scope){

            }],
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    var flow = scope.wfCode;
                    if(!!flow){
                        iElement.on('click', function(){

                        });
                    }
                };
            }
        }
    }]);
