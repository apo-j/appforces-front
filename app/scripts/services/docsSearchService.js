/**
 * Created by Pluto on 17/4/14.
 */
'use strict';
	
angular.module('services').factory('afDocsSearch', ['afLunrSearch',
    function(afLunrSearch){	
		var index = lunr(function(){
			this.ref('id');
			this.field('title', {boost: 50});
			this.field('keywords', { boost : 20 });
		});
		
		var _index = afLunrSearch(index.toJSON(),
		[{title: 'one', keywords: 'one title titre 1'}, 
		{
			title: 'two', keywords: 'two title titre 2', 
			isSearchResultContainer: false,
			os: "Android 2.39",
			searchId: "123456",
			templateUrl: "components/accordion/2",
			ui: "Android",
			}], 
		false);
		
		return {
			search:function(q){
				return _index.search(q);
			}
		}
    }]);	
	




