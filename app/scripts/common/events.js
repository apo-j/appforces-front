/**
 * Created by xyj on 21/02/14.
 */
var Events = (function(events){
    var self = events;

    self.REQUIRE_LOGIN = 'e:require.login';
    self.LOGIN_CONFIRMED = 'e:login.confirmed';
    self.LOGIN_CANCELED = 'e:login.canceled';
    self.NAV_ERR = 'e:navigation.error';
	self.RELOAD_PAGE_BODY = 'e:reload.page.body';
	self.SEARCH = 'e:search';
	self.LOCAL_SEARCH = 'e:local.search';
	self.SEARCH_SUCCESS = 'e:search_success';
	self.SEARCH_ERROR = 'e:search_error';
	self.ERROR = 'e:error';
	
    return self;
}(Appforces.Events || {}))