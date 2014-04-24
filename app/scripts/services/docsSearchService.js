/**
 * Created by Pluto on 17/4/14.
 */
'use strict';
angular.module('services', ['ngResource']);
	
angular.module('services').factory('afDocsSearch', ['afLunrSearch',
    function(afLunrSearch){	
        var _index = afLunrSearch.;
		return {
			setIndex: function(properties){
                _indexProperties = properties;
            },
            setIndex: function(index){
                afLunrSearch.initIndex(index);
            }
		}
    }]);	
	




