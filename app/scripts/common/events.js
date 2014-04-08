/**
 * Created by xyj on 21/02/14.
 */
var Events = (function(events){
    var self = events;

    self.REQUIRE_LOGIN = 'e:require_login';
    self.LOGIN_CONFIRMED = 'e:login_confirmed';
    self.LOGIN_CANCELED = 'e:login_canceled';
    self.NAV_ERR = 'e:navigation_error';
    return self;
}(Appforces.Events || {}))