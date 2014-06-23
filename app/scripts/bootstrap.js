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

	//set navigator compatibilites config
	//web worker
	if (typeof (Worker) !== "undefined") {
		Configuration.IsWorkerSupported = true;
	}
	
    //send appHost back to server to fetch app config data before bootstrap
    $.getJSON(Configuration.AppConfigUrl + appHost +  '.json', function(data){
        if(data && data.status == 200){
            Configuration.AppConfig = data;
            document.getElementById(Configuration.FaviconId).setAttribute('href', (Configuration.AppConfig.faviconUrl || Configuration.DefaultFaviconUrl));//favicon
            document.getElementById(Configuration.AppleTouchFaviconId).setAttribute('href', (Configuration.AppConfig.appleTouchFaviconUrl || Configuration.DefaultAppTouchFaviconUrl));//appleTouchIcon
            angular.bootstrap(document, ['appForce']);

            angular.forEach(Configuration.AppConfig.styles, function(value, key){
                var style = document.createElement('link');
                style.rel = 'stylesheet';
                style.href = value;
                document.getElementsByTagName('head')[0].appendChild(style);
            });

           angular.forEach(Configuration.AppConfig.scripts, function(value, key){
               var script = document.createElement('script');
               script.src = value;
               document.getElementsByTagName('body')[0].appendChild(script);
           });

            /*//todo only for dev (compile less)
            var script = document.createElement('script');
            script.src = "vendor/less.min.js";
            document.getElementsByTagName('head')[0].appendChild(script);*/



        }else{
            $('body').text("Application not available!");
    }
    });
});
