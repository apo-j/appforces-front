/**
 * Created by xyj on 21/01/14.
 */
'use strict';

var Configuration = (function(configuration){
    var self = configuration;
    self.AppName = "App Forces"
    self.AppPageTitleId = "app-page-title";
    self.FaviconId = "af-favicon";
    self.AppleTouchFaviconId = "af-apple-favicon";
    self.DefaultAppTouchFaviconUrl = "/images/favicon.ico";
    self.DefaultFaviconUrl = "/images/favicon.ico";
    //configuration.Environment = "DEVELOPMENT";//PRODUCTION
    self.AppConfigUrl = "/api/config/";
    self.AppConfig = {};
    self.DefaultPageUrl = {
        Psignin:"/signin",
        P404:"/404"
    };

    return self;
}(Appforces.Configuration || {}))