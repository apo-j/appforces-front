/**
 * Created by Pluto on 17/4/14.
 */
'use strict';

angular.module('services').factory('afDocsSearch', ['afLunrSearch',
    function(afLunrSearch){
        var self = this;
        self.isInited = false;
        self.docs = [];
        var _index;

        self.init = function(options, docs){
            self.docs = docs;
            var index = lunr(function(){
                var _self = this;
                _self.ref('id');
                _self.field('title', { boost : 20 });
                _self.field('keywords', { boost : 20 });

                angular.forEach(options, function(value, key){
                    _self.field(value.criteria, { boost : value.boost });
                });

            });
            _index = afLunrSearch(index.toJSON(), docs);
            self.isInited = true;
        };

        self.search = function(q){
            if(_index){
                return _index.search(q);
            }else{
                return false;
            }
        };

        return self;
    }]);

/*var docs = [];

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
}*/

/*angular.module('services').factory('afDocsSearch', ['afLunrSearch',
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
    }]);*/


	




