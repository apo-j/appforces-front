/**
 * Created by Pluto on 12/28/13.
 */
'use strict';
//bootstrap app
angular.element(document).ready(function() {
    //get app domain name
    var appHost = window.location.host;

    if(appHost && appHost.indexOf(':') != -1){
        appHost = appHost.split(':')[0];//remove port number if any
    }

    if (typeof (Worker) !== "undefined") {
        Configuration.isWorkerSupported = true;
    }else{
        Configuration.isWorkerSupported = false;
    }

    //send appHost back to server to fetch app config data before bootstrap
    $.getJSON(Configuration.AppConfigUrl + appHost +  '.json', function(data){
        if(data && data.status == 200){
            Configuration.AppConfig = data;
            document.getElementById(Configuration.FaviconId).setAttribute('href', (Configuration.AppConfig.faviconUrl || Configuration.DefaultFaviconUrl));//favicon
            document.getElementById(Configuration.AppleTouchFaviconId).setAttribute('href', (Configuration.AppConfig.appleTouchFaviconUrl || Configuration.DefaultAppTouchFaviconUrl));//appleTouchIcon
            angular.bootstrap(document, ['appForce']);
        }else{
            $('body').text("Application not available!");
        }
    });
});
