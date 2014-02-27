/**
 * Created by xyj on 27/02/14.
 */
'use strict';
angular.module('directives.components', []);

angular.module('directives.components').directive('afGeneralComponent',
    ['$compile', 'afUtils','afComponents', function($compile,afUtils, afComponents){
        return {
            restrict: "AE",
            scope:{
              afdata:"="
            },
            compile:function(tElement, tAttr) {
                var regex_directive = /#\{directive\}/g;
                return function(scope , iElement, iAttrs) {
                    var tpls = "<div #{directive} afdata='afdata'></div>";
                    var componentName = afComponents[scope.afdata.type];
                    if(componentName){
                        tpls = tpls.replace(regex_directive, 'af-' + componentName);
                        $compile(tpls)(scope, function(clone, scope){
                               iElement.html(clone);
                           });
                    }
                }
            }
        }
    }]);

angular.module('directives.components').directive('afDatepicker',
        ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile, afUtils){
            return {
                restrict: "AE",
                scope:{
                  afdata:"="
                },
                compile:function(tElement, tAttr) {
                    return function(scope , iElement, iAttrs) {
                        $http.get(afUtils.templateUrl.component('datepicker'), {cache: $templateCache}).success(function(tplContent){
                            $compile(tplContent)(scope, function(clone, scope){
                                iElement.html(clone);
                            });
                        });
                    }
                }
            }
        }]);

angular.module('directives.components').directive('afAccordion',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.component('accordion'), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.html(clone);
                        });
                    });
                }
            }
        }
    }]);

angular.module('directives.components').directive('afCarrousel',
    ['$http', '$templateCache', '$compile', 'afUtils', function($http, $templateCache, $compile,afUtils){
        return {
            restrict: "AE",
            scope:{
                afdata:"="
            },
            compile:function(tElement, tAttr) {
                return function(scope , iElement, iAttrs) {
                    $http.get(afUtils.templateUrl.component('carrousel'), {cache: $templateCache}).success(function(tplContent){
                        $compile(tplContent)(scope, function(clone, scope){
                            iElement.html(clone);
                        });
                    });
                }
            }
        }
    }]);