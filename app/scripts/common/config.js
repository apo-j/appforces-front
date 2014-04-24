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
	self.DefaultSearchUrl = "/api/search";//TODO should add app id two this url
    self.AppConfig = {};
    self.DefaultPageUrl = {
        Psignin:"/signin",
        P404:"/404"
    };
	self.LocationMode = 'hashbang';
	self.IsWorkerSupported = false;
	self.WorkerBasePath = '/scripts/workers/';

    return self;
}(Appforces.Configuration || {}))