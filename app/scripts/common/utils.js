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

    self.fn = {

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
        headerMenuComponents:function(name){
            return '/partials/header/menu/components/' + name + '.html';
        },
        component:function(name){
            return '/partials/components/' + name + '.html';
        }
    }


    return self;
}(Appforces.Utils || {}))