/**
 * Created by xyj on 03/06/2014.
 */
'use strict';

angular.module('services').provider('afWorkflowManager',
    [function(){
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

angular.module('services').factory('afWorkflowManager', ['afConfig','afWorkers',
    function(afConfig, afWorkers){
        var _availableWorkflows = [
            {key: 'local_search', path:afConfig.WorkerBasePath + 'afSearchWorker.js'}
        ];

        angular.forEach(_availableWorkflows, function(value, key){
            afWorkers.createWorker(value.key, value.path);
        });

        return {
            getWorkflow:function(key){
                return afWorkers.getWorker('local_search') || false;
            }
        };
    }]);