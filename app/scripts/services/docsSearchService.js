/**
 * Created by Pluto on 17/4/14.
 */
'use strict';
angular.module('services', ['ngResource']);
	
angular.module('services').factory('afDocsSearch', ['afLunrSearch',
    function(afLunrSearch){	
		var _index;
		return {
			initIndex: function(){
				_index = afLunrSearch(function(){
					this.ref('id');
					this.field('title', {boost: 50});
					this.field('keywords', { boost : 20 }); 
				}, false);
			},
			set
		}
    }]);	
	




