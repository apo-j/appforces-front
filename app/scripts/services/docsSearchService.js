/**
 * Created by Pluto on 17/4/14.
 */
'use strict';

var docs = [];

for(var i = 0; i < 10000; i++){
    docs.push( {
        title: 'two' + i,
        keywords: 'two title titre 2 ' + i ,
        isSearchResultContainer: false,
        os: "Android 2.39",
        searchId: "123456",
        templateUrl: "components/accordion/2",
        ui: "Android"
    });
}


angular.module('services').factory('afDocsSearch', ['afLunrSearch',
    function(afLunrSearch){	
		var index = lunr(function(){
			this.ref('id');
			this.field('title', {boost: 50});
			this.field('keywords', { boost : 20 });
		});
		
		var _index = afLunrSearch(index.toJSON(), docs);
		
		return {
			search:function(q){
				return _index.search(q);
			}
		}
    }]);	
	




