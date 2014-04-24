/**
 * Created by Pluto on 17/4/14.
 */
'use strict';

angular.module('services').factory('afLunrSearch', ['afConfig', 'afLunr','afWorkerManager','$q','$rootScope','afEvents',
    function(afConfig, afLunr, afWorkerManager, $q, $rootScope, afEvents){	
		var _deferred;
			
		return function(docs, fromJSON){//docs == null if fromJSON is true
			var documents = docs;
			if (afConfig.IsWorkerSupported) {
				var actionHandlers = {
					error: function(data, status){
						$rootScope.$broadcast(afEvents.ERROR, data);
					},
					search: function(data, status){
						if(status === 200){
							_deferred.resolve(data);
						}else{
							_deferred.reject(status);
						}
					}
				}
			
				var searchWorker = afWorkerManager.getSearchWorker();
				
				searchWorker.postMessage({action: 'stores', data: {documents: documents}});//init index and add docs
				searchWorker.onmessage = function(event){
					if(actionHandlers.hasOwnProperty(event.data.action)){
						actionHandlers[event.data.action](event.data.data, event.data.status);
					}else{
						$rootScope.$broadcast(afEvents.ERROR, {target: 'afLunrSearch', msg: 'no handler for ' + event.data.action});
					}
				};
				
				return {
					search: function(q){
						_deferred = $q.defer();
						searchWorker.postMessage({action: 'search', data: q});
						return _deferred.promise;
					}
				}
				
			}else{
				var _engine;

				if(!fromJSON){
					_engine = afLunr(function(){
						this.ref('id');
						this.field('title', {boost: 50});
						this.field('keywords', { boost : 20 });
					});
					
					angular.forEach(documents, function(document, key){
						var doc = angular.extend({id: key}, document);
						_engine.add(doc);
					});
				}else{
					//TODO
					_engine = afLunr.Index.load(index.toJSON());
				}

				return {
					search: function(q){
						if(_engine){
							var results = [];
							angular.forEach(_engine.search(q), function(result){
								var key = result.ref;
								var item = documents[key];
							
								var limit = 14;
								if(results.length < limit) {
									results.push(item);
								}
							});
							
							
							_deferred.resolve(results);
						}else{
							_deferred.reject(q);
						}
						return _deferred.promise;
					}
				}
			}
			
		
			
		}
    }]);	
	




