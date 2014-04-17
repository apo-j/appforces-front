/**
 * Created by Pluto on 17/4/14.
 */
'use strict';
angular.module('services', ['ngResource']);
	
angular.module('services').factory('afDocsSearch', ['afLunrSearch',
    function(afLunrSearch){	

		return {
			setIndex: function(index){
				afLunrSearch.loadIndex(index);
			}
		}
    }]);	
	




