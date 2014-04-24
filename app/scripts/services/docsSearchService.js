/**
 * Created by Pluto on 17/4/14.
 */
'use strict';
	
angular.module('services').factory('afDocsSearch', ['afLunrSearch',
    function(afLunrSearch){	
		var _index = afLunrSearch(
		[{title: 'one', keywords: 'one title titre 1'}, {title: 'two', keywords: 'two title titre 2'}], 
		false);
		
		return {
			search:function(q){
				return _index.search(q);
			}
		}
    }]);	
	




