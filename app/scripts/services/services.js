/**
 * Created by Pluto on 1/2/14.
 */
'use strict';
angular.module('services', ['ngResource']);

angular.module('services').factory('afHeader', ['$resource','afConfig',
    function($resource, afConfig){
        return $resource('api/headers/:appId/:pageId.json', {appId: afConfig.AppConfig.appId});
    }]);

angular.module('services').factory('afSidebar', ['$resource','afConfig',
    function($resource, afConfig){
        return $resource('api/sidebars/:appId/:pageId/:position.json', {appId: afConfig.AppConfig.appId});
    }]);

angular.module('services').factory('afComponent', ['$resource','afConfig',
    function($resource, afConfig){
        return $resource('api/components/:appId/:pageId/:componentId.json', {appId: afConfig.AppConfig.appId});
    }]);


/*angular.module('services').provider('afNavigationState',
    function(){
        var self = this;
        self._states  = [];

        self.initStates = function(states){
            self._states = states || [];
        },
        self.$get = ['$location','afUtils', function($location, afUtils) {
                return {
                    currentState:function(){
                        var match = afUtils.Collection.find(self._states, function(state){
                            return $location.path().toLowerCase() ===  (state.url || '/').toLowerCase();
                        });

                       return match ? match : null;//{state: 'index', url:'/'};
                    }
                };
            }]

    });*/

//page
angular.module('services').factory('afPage',['afConfig','$resource','$cacheFactory','afUtils','$location',
    function(afConfig, $resource, $cacheFactory, afUtils, $location){
        var self = {};
        var _currentPage = null;
        var _indexPage = null;

        self.cache = $cacheFactory('lrucache', {
            capacity: 100
        });
        self.indexPage = function(){
            if(!_indexPage){
                _indexPage = afUtils.Collection.find(afConfig.AppConfig.pages, function(item){
                    return item.isIndexPage || false;
                });
            }

            return _indexPage;
        };

        self.setCurrentPage = function(){
            var match = afUtils.Collection.find(afConfig.AppConfig.pages, function(page){
                return $location.path().toLowerCase() ===  (page.url || '/').toLowerCase();
            });

            if(match){
                _currentPage = match;
            }
        };

        self.currentPage = function(){
            return _currentPage;
        };

        /*self.pageData = function(){
            return $resource('api/pages/:appId/:pageId.json');//, {get:{cache: self.cache}});
        }*/

        self.pageTitle = function(){
            return (self.currentPage()? self.currentPage().title : null) || afConfig.AppConfig.appName || afConfig.AppName;
        };

        return self;
    }]);

//configuration
//TODO delete
angular.module('services').provider('afNavigationStateManager',
    [function(){
        var self = this;
        self._states  = [];
        self._currentIndex = -1;
        self.$get = ['$location','afUtils', function($location, afUtils) {
            return {
                push:function(state){
                    self._states.push(state);
                    self._currentIndex++;
                    return state;
                },
                pop:function(){
                    if(self._states.length > 0){
                        var res = self._states[self._currentIndex];
                        self._currentIndex--;
                        self._states = self._states.slice(0, _currentIndex);
                        return res;
                    }
                    return null;
                },
                current:function(){
                    if(self._currentIndex >= 0){
                        return self._states[self._currentIndex];
                    }
                    return null;
                },
                currentState:function(){
                    var match = afUtils.Collection.find(self._states, function(state){
                        return $location.path().toLowerCase() ===  (state.url || '/').toLowerCase();
                    });

                    return match ? match.state : null;
                }
            };
        }];
    }]);
