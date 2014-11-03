/**
 * Created by Pluto on 1/2/14.
 */
'use strict';
angular.module('services', ['ngResource']);

angular.module('services').factory('afHeader', ['$resource','afConfig',
    function($resource, afConfig){
        return $resource('api/headers/:appId/:pageId', {appId: afConfig.AppConfig.AppId});
    }]);
	
angular.module('services').factory('afVars', [
    function(){
		var _vars = {};
		
        return {
			set:function(property, value){
				if(property){
					_vars[property] = value;
				}
			},
			get:function(property){
				if(property){
					return _vars[property] || false;
				}else{
					return false;
				}
			},
			remove:function(property){
				delete _vars[property];
			},
			removeAll:function(){
				_vars = {};
			}
		};
    }]);	
	
angular.module('services').factory('afData', ['$resource','afConfig','$http',
    function($resource, afConfig, $http){
        return {
			get:function(url, params){
                if(url){
                    url = url.replace(/^\//, '');
                    var _url = afConfig.AppDataUrl + afConfig.AppConfig.appId + '/' + url;
                    return $http(angular.extend({method: 'get', url: _url}, params));
                }else{
					//TODO
				}
			},
			post:function(url, params){
				if(url){
					url = url.replace(/^\//, '');
					return $http({method: 'post', url: url, data: params});
				}else{
					//TODO
				}
			}
		}
    }]);	
	
angular.module('services').factory('afEventRegister', ['$rootScope', 'afConfig','afData','afEvents','afDocsSearch',
    function($rootScope, afConfig, afData, afEvents, afDocsSearch){
        return {
			registerOnPageReload: function(scope){
				scope.$on(afEvents.RELOAD_PAGE_BODY, function(event, data){
                    afData.post(data.url, data.params).success(function(pageData){
                        scope.afdata = pageData;
                    });
				});
			},
			registerOnSearch: function(scope, searchId){
				scope.$on(afEvents.SEARCH, function(event, data){
					if(data.data.searchId === searchId){
						afData.post(data.url, data.data).success(function(pageData){
							scope.afdata = pageData;
							$rootScope.$broadcast(afEvents.SEARCH_SUCCESS, {searchId: searchId, data: data.data});
						}).error(function(rejection){
							$rootScope.$broadcast(afEvents.SEARCH_ERROR, {searchId: searchId, data: data.data});
						});
					}
				});
			},
			registerOnLocalSearch: function(scope){
				scope.$on(afEvents.LOCAL_SEARCH, function(event, data){
                    scope.results = afDocsSearch.search(data.query);

                    scope.results.then(function(data){
                        scope.results = data;
					});
						
				});
			}
		}
    }]);	

angular.module('services').factory('afSidebar', ['$resource','afConfig',
    function($resource, afConfig){
        return $resource('api/sidebars/:appId/:pageId/:position.json', {appId: afConfig.AppConfig.appId});
    }]);

angular.module('services').factory('afBottom', ['$resource','afConfig',
    function($resource, afConfig){
        return $resource('api/footer/:appId/:pageId.json', {appId: afConfig.AppConfig.appId});
    }]);

angular.module('services').factory('afComponentData', ['$resource','afConfig',
    function($resource, afConfig){
        return $resource('api/components/:appId/:componentId.json', {appId: afConfig.AppConfig.AppId});
    }]);

angular.module('services').factory('afArticles', ['$resource', '$q','$http', 'afConfig','afDocsSearch','afCriteriaSearch',
    function($resource, $q, $http, afConfig, afDocsSearch, afCriteriaSearch){
        var defaultUrl = 'api/articles/:appId/:articleId',
            deferred = $q.defer();
        var url = defaultUrl.replace(':articleId', afConfig.SearchGetAllDefaultParamVal).replace(':appId', afConfig.AppConfig.AppId);

        var res = $resource(defaultUrl,{
                appId: afConfig.AppConfig.appId,
                articleId: afConfig.SearchGetAllDefaultParamVal
            });

        res.search =  function (criteria){
            $http({method: 'POST', url: 'api/search/1/Article', data:criteria}).
                success(function(data, status) {
                    if(afConfig.AppConfig.IsLocalSearchActivated){
                        if(!afDocsSearch.isInited){
                            afDocsSearch.init(afConfig.AppConfig.LocalSearchOptions, data.data);
                        }

                        afCriteriaSearch.exactSearch(criteria).then(function(data){
                            deferred.resolve({data: data, status: status});
                        });
                    }else{
                        deferred.resolve({data: data.data, status: status});
                    }
                }).
                error(function(data, status) {
                    deferred.reject({data: data, status: status});
                });
            return deferred.promise;
        }

        return res;
    }]);


angular.module('services').factory('afNavigation', ['$resource','afEnums', 'afUtils', '$location', '$window', '$rootScope','afEvents',
    function($resource, afEnums, afUtils, $location, $window, $rootScope, afEvents){
        
		return {
			navigateTo:function(src){
				var _defaultSrcOptions = {
					target: '_blank',
					href:''
				}

				angular.extend(_defaultSrcOptions, src);
				
				if(_defaultSrcOptions.href.indexOf(afEnums.NavigationType.outer) == 0){
					_defaultSrcOptions.href = _defaultSrcOptions.href.replace(afEnums.NavigationType.outer, ''); 

                    if(_defaultSrcOptions.target == '_self'){
                        $window.location = _defaultSrcOptions.href;
                    }else{
                        $window.open(_defaultSrcOptions.href, '_blank');
                    }
				}else if(_defaultSrcOptions.href.indexOf(afEnums.NavigationType.inner) == 0){
					_defaultSrcOptions.href = _defaultSrcOptions.href.replace(afEnums.NavigationType.inner, '');

                    $rootScope.$apply( function(){
                        $location.path(_defaultSrcOptions.href);//to other page of the same site
                    });
				}else if(_defaultSrcOptions.href.indexOf(afEnums.NavigationType.content) == 0){
					_defaultSrcOptions.href = _defaultSrcOptions.href.replace(afEnums.NavigationType.content, '');

                    $rootScope.$broadcast(afEvents.RELOAD_PAGE_BODY, {url:_defaultSrcOptions.href, params:{}});
				}else if(_defaultSrcOptions.href.indexOf(afEnums.NavigationType.jump) == 0){//jump
						_defaultSrcOptions.href = _defaultSrcOptions.href.replace(afEnums.NavigationType.jump, '');
						//TODO jump
				}else{
					$rootScope.$emit(afEvents.NAV_ERR, src.href);
				}
			}
		};
    }]);
	
angular.module('services').provider('afUtils',
    function(){
        var self = this;
        self._utils;

        self.initUtils = function(utils){
            self._utils = utils || {};
        },
		
        self.$get = ['afConfig', 'afEnums', function(afConfig, afEnums) {
				self._utils.getUrl = function (raw, replace) {
					var res = raw;
					if(raw && replace){
						res = res.replace(replace.pattern, replace.content);
					}
					
					if(afConfig.LocationMode === 'hashbang' && replace.pattern === afEnums.NavigationType.inner){
						res = '#/' + res;
					}
					
					return res;
				};
				
                return self._utils;
            }]

    });

//page
angular.module('services').factory('afPage',['afConfig','$resource','$cacheFactory','afUtils','$location','afEnums',
    function(afConfig, $resource, $cacheFactory, afUtils, $location, afEnums){
        var self = {};
        var _currentPage = null;
        var _indexPage = null;
        var _signinPage = null;
        var _signupPage = null;
        var _404Page = null;
        var _500Page = null;
        var _401Page = null;
        var _searchResultPage = null;

        self.pages = {};

        self.addPage = function(page){
            if(!self.pages.hasOwnProperty(page.key)){
                self.pages[page.key] = page.value;
            }
        };

        self.getPage = function(key){
            if(self.pages.hasOwnProperty(key)){
                return self.pages[key]
            }else{
                return false;
            }
        }
        self.cache = $cacheFactory('lrucache', {
            capacity: 100
        });
        self.pageIndex = function(){
            if(!_indexPage){
                _indexPage = afUtils.Collection.find(afConfig.AppConfig.Pages, function(item){
                    return item.isIndexPage || false;
                });
            }

            return _indexPage;
        };

        self.pageSignin = function(){
            if(!_signinPage){
                _signinPage = afUtils.Collection.find(afConfig.AppConfig.Pages, function(item){
                    return item.Type === afEnums.pageType['pSignin'];
                });
            }

            return _signinPage;
        };
		
		self.pageSignup = function(){
            if(!_signupPage){
                _signupPage = afUtils.Collection.find(afConfig.AppConfig.Pages, function(item){
                    return item.Type === afEnums.pageType['pSignup'];
                });
            }

            return _signupPage;
        };
		
		self.page404 = function(){
            if(!_404Page){
                _404Page = afUtils.Collection.find(afConfig.AppConfig.Pages, function(item){
                    return item.Type === afEnums.pageType['p404'];
                });
            }

            return _404Page;
        };
		
		self.page401 = function(){
            if(!_401Page){
                _401Page = afUtils.Collection.find(afConfig.AppConfig.Pages, function(item){
                    return item.Type === afEnums.pageType['p401'];
                });
            }

            return _401Page;
        };
		
		self.page500 = function(){
            if(!_500Page){
                _500Page = afUtils.Collection.find(afConfig.AppConfig.Pages, function(item){
                    return item.Type === afEnums.pageType['p500'];
                });
            }

            return _500Page;
        };

        self.pageSearchResult = function(){
            if(!_searchResultPage){
                _searchResultPage = afUtils.Collection.find(afConfig.AppConfig.Pages, function(item){
                    return item.Type === afEnums.pageType['pSearchResult'];
                });
            }

            return _searchResultPage;
        };

        self.setCurrentPage = function(){
            var match = afUtils.Collection.find(afConfig.AppConfig.Pages, function(page){
                return $location.path().toLowerCase() ===  (page.Url || '/').toLowerCase();
            });

            if(!match){
                match = afUtils.Collection.find(afConfig.AppConfig.Workflow, function(wf){
                    return $location.path().toLowerCase() ===  (wf.Url || '/').toLowerCase();
                });
            }

            if(match){
                _currentPage = match;
                return _currentPage;
            }

            return false;
        };

        self.currentPage = function(){
            return _currentPage;
        };

        self.page = function(){
            return $resource('api/pages/:appId/:pageId');//, {get:{cache: self.cache}});
        };

        self.currentPageData = function(){
            return self.page().get({appId: afConfig.AppConfig.AppId, pageId: self.currentPage().Id}).$promise;
        };

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
