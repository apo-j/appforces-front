/**
 * Created by Pluto on 17/4/14.
 */
'use strict';
angular.module('services', ['ngResource']);
	
angular.module('services').factory('afLunrSearch', ['afLunr',
    function(afLunr){	
		var _engine;
		return {
			initIndex: function(properties){
				_engine = afLunr(properties);
			},
			initFromJSON: function(index){
				_engine = afLunr.Index.load(index.toJSON());
			},
			store: function(values){
				if(_engine){
					_engine.add(values);
				}
			},
			search: function(q){
				if(_engine){
					return _engine.search(q);
				}
				return null;
			}
		}
    }]);	
	




