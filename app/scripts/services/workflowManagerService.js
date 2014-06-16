/**
 * Created by xyj on 03/06/2014.
 */
'use strict';
angular.module('services.workflow',[]);

angular.module('services.workflow').provider('afWorkflow',
    ['afConfig', function(afConfig){
        var self = this;

        var workflow = function(){
            return $resource('api/workflow/:appId/:workflowId.json', {appId: afConfig.AppConfig.id});//, {get:{cache: self.cache}});
        };

        self.workflowData = function(id){
            return workflow().get({workflowId: id}).$promise;
        };

        return self;
    }]);


angular.module('services.workflow').provider('afWorkflowManager',
    ['afWorkflow', function(afWorkflow){
        var self = this;
        self.workflows  = {};

        self.init = function(workflows){
            angular.forEach(workflows, function(value, key){
                self.workflows[value.id] = value;
            })
        },

        self.$get = [function() {
            return {
                get: function(code){
                    return self.workflows[code];
                }
            };
        }];
    }]);