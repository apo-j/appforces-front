/**
 * Created by Pluto on 22/4/14.
 */
'use strict';

angular.module('services').factory('afWorkerManager', ['afConfig','afWorkers',
    function(afConfig, afWorkers){
		
		if (afConfig.IsWorkerSupported){ 
			var _availableWorkers = [
				{key: 'local_search', path:afConfig.WorkerBasePath + 'afSearchWorker.js'}
			];
			
			angular.forEach(_availableWorkers, function(value, key){
				afWorkers.createWorker(value.key, value.path);
			});
			
			return {
				getSearchWorker:function(){
					return afWorkers.getWorker('local_search') || false;	
				}
			};
		}else{
			return null;
		}
    }]);	
	




