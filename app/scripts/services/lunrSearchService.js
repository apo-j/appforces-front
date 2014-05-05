/**
 * Created by Pluto on 17/4/14.
 */
'use strict';

angular.module('services').factory('afLunrSearch', ['afConfig', 'afLunr','afWorkerManager','$q','$rootScope','afEvents',
    function(afConfig, afLunr, afWorkerManager, $q, $rootScope, afEvents){	
		var _deferred;
			
		return function(index, docs){
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
				};
			
				var searchWorker = afWorkerManager.getSearchWorker();
				
				searchWorker.postMessage({action: 'stores', data: {index: index, documents: documents}});//init index and add docs
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
						searchWorker.postMessage({action: 'search', data: {query: q, limit: afConfig.AppConfig.localSearchLimit}});
						return _deferred.promise;
					}
				}
			}else{
				var _engine;

				_engine = afLunr.Index.load(index);
				
				angular.forEach(documents, function(document, key){
					var doc = angular.extend({id: key}, document);
					_engine.add(doc);
				});

				return {
					search: function(q){
                        _deferred = $q.defer();
						if(_engine){
							var results = [];
                            var limit = afConfig.AppConfig.localSearchLimit === 0 ? results.length : afConfig.AppConfig.LocalSearchLimit || afConfig.LocalSearchLimit;

							angular.forEach(_engine.search(q), function(result){
								if(results.length < limit) {
                                    var item = documents[result.ref];
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
	




