// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
	  'app/vendor/Namespace.js',
      'app/bower_components/jquery/dist/jquery.min.js',
	  'app/vendor/jqueryui/js/jquery-ui-1.10.4.custom.js',
	  'app/bower_components/underscore/underscore.js',
	  'app/scripts/common/global.js',
	  'app/scripts/common/config.js',
	  'app/scripts/common/utils.js',
	  'app/scripts/common/enums.js',
	  'app/scripts/common/events.js',
	  'app/scripts/common/components.js',

      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
	  'app/scripts/common/http-auth-interceptor.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'app/vendor/*.js',
      'app/scripts/common/global.js',
	  'test/mock/config/bootstrap.js',
      'app/scripts/app.js',	
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
		'app/scripts/bootstrap.js',//replace by bootstrap.js in test/mock/config/
	],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
