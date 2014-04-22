/**
 * Created by Pluto on 22/4/14.
 */
'use strict';
angular.module('services', ['ngResource']);
	
angular.module('services').factory('afWorkerRegister', ['afConfig','afWorkers',
    function(afConfig, afWorkers){
		
		if (afConfig.IsWorkerSupported) 
			var _availableWorkers = [
				{key: 'local_search', path:afConfig.WorkerBasePath + 'afSearchWorker.js'}
			];
			
			return {
				getSearchWorker:function(){
					return _workers['local_search'] || false;	
				}
			};
		}else{
			return null;
		}
    }]);	
	




