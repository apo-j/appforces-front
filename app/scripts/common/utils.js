/**
 * Created by xyj on 14/02/14.
 */
'use strict';

var Utils = (function(utils){
    var self = utils;
    self.Collection = {
        where: function(list, attrs){
			return _.where(list, attrs);
		},
        find: function(list, predicate, context){
			return _.find(list, predicate, context);
		},
        map: function(list, iterator, context){
            return _.map(list, iterator, context);
        }
    };

    self.getUrl = function (raw, replace, mode) {
		var res = '';
		if(raw){
			replace = replace || [];
			angular.forEach(replace, function(item, index){
				res = raw.replace(item.pattern, item.content);
			});
		}
        
		if(mode === 'hashbang'){
			res = '#' + res;
		}
		
		return res;
    };

    self.templateUrl = {
        header:function(name){
            return '/partials/header/' + name + '.html';
        },
        headerTop:function(name){
            return '/partials/header/top/' + name + '.html';
        },
        headerMenu:function(name){
            return '/partials/header/menu/' + name + '.html';
        },
        headerNavbar:function(name){
            return '/partials/header/menu/' + name + '.html';
        },
        headerMenuComponents:function(name){
            return '/partials/header/menu/components/' + name + '.html';
        },
        components:function(type, templateUrl){
            return '/partials/components/#{type}/#{url}.html'.replace(/#\{type\}/, type).replace(/#\{url\}/, templateUrl);
        },
        component:function(name){
            return '/partials/components/' + name + '.html';
        }
    }


    return self;
}(Appforces.Utils || {}))