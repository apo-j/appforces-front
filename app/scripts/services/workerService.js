/**
 * Created by Pluto on 17/4/14.
 */
'use strict';
angular.module('services', ['ngResource']);
	
angular.module('services').factory('afWorkers', ['afConfig',
    function(afConfig){
		if (afConfig.IsWorkerSupported) {
			var _workers = {};
			
			return {
				createWorker: function(key, workPath){
					if(_workers[key]){
						return _workers[key];
					}
					
					_workers[key] = new Worker(workPath);
					return _workers[key];
				},
				getWorker:function(key){
					if(key){
						return _workers[key] || false;
					}else{
						return false;
					}
				},
				remove:function(property){
					delete key[property];
				},
				removeAll:function(){
					key = {};
				}
			};
		}else{
			return null;
		}
    }]);	
	




