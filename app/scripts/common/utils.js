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

    self.makeUrl = function (raw, replace, mode) {
		var res = '';
		if(raw){
            res = raw;
			replace = replace || [];
			angular.forEach(replace, function(item, index){
                res = res.replace(item.pattern, item.content);
			});
		}
        
		if(mode === 'hashbang'){
			res = '#' + res;
		}
		
		return res;
    };

    self.templateUrl = {
		template:function(name){
			return name + '.html';
		},
        header:function(name){
            return '/partials/header/' + name + '.html';
        },
        sidebar:function(name){
            return '/partials/sidebar/' + name + '.html';
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
        directiveComponent:function(type){
            return '/partials/components/#{type}/#{type}.html'.replace(/#\{type\}/g, type);
        },
        component:function(type, templateUrl){
            return '/partials/components/#{type}/templates/#{url}.html'.replace(/#\{type\}/, type).replace(/#\{url\}/, templateUrl);
        },
        page:function(url){
            return '/partials/pages/' + url + '.html';
        },
        workflow:function(type, templateUrl){
            if(templateUrl){
                return '/partials/components/workflow/#{type}/templates/#{url}.html'.replace(/#\{type\}/g, type).replace(/#\{url\}/, templateUrl);
            }else{
                return '/partials/components/workflow/#{type}/#{type}.html'.replace(/#\{type\}/g, type);
            }

        }
    }


    return self;
}(Appforces.Utils || {}))