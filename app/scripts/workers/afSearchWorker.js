/**
 * Created by xyj on 03/01/14.
 */
'use strict';

importScripts('/vendor/lunr.min.js', '/bower_components/underscore/underscore.js', '/scripts/common/config.js');

(function(){
	var index;
	var documents;

	var actionHandlers = {
		error: function(error){
			postMessage({action: 'error', data: error});
		},
		initIndex: function(properties){
			index = lunr(properties);
		},
		store: function(value){
			index.add(value);
		},
		stores: function(data){
			index = lunr.Index.load(data.index);
			documents = data.documents; 	
			_.each(documents, function(value, key){
				var doc = _.extend({id: key}, value);
				index.add(doc);
			});
		},
		search: function(data){
			var results = [];

            var limit = data.limit == 0 ? results.length  : data.limit || Configuration.LocalSearchLimit;
			_.each(index.search(data.query), function(result){
				if(results.length < limit) {
                    var item = documents[result.ref];
					results.push(item);
				}
			}) 

			postMessage({action: 'search', data: results, status: 200});
		}
	}


	self.addEventListener('message', function(event) {
		if(actionHandlers.hasOwnProperty(event.data.action)){
			actionHandlers[event.data.action](event.data.data);
		}else{
			actionHandlers['error']({action: 'error', data: {target: 'afSearchWorker', msg: 'no handler for ' + event.data.action}, status: '400'});
		}
	}, false);
}());