/**
 * Created by Pluto on 17/4/14.
 */
'use strict';
angular.module('services', ['ngResource']);
	
angular.module('services').factory('afLunrSearch', ['afLunr',
    function(afLunr){	
		var _engine;
		return function(properties, fromJSON){
			if(!fromJSON){
				_engine = afLunr(properties);
			}else{
				//TODO
				_engine = afLunr.Index.load(index.toJSON());
			}

			return {
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
		}
    }]);	
	




