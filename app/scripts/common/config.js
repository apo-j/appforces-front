/**
 * Created by xyj on 21/01/14.
 */
'use strict';
var Appforces = Appforces || {};

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
    self.AppDataUrl = "/api/data/";
	self.DefaultSearchUrl = "/api/search";//TODO should add app id two this url
    self.AppConfig = {};
    self.DefaultPageUrl = {
        Psignin:"/signin",
        P404:"/404"
    };
	self.LocationMode = 'hashbang';
	self.IsWorkerSupported = false;
	self.WorkerBasePath = '/scripts/workers/';
    self.LocalSearchLimit = 40;
    self.SearchGetAllDefaultParamVal = 0;

    self.ComponentDefaultOptions = {
        Carousel:{
            Interval:3000
        }
    }
    return self;
}(Appforces.Configuration || {}))