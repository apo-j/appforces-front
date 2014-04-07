'use strict';

describe('Controller: DocHeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('appForce'));

  var createController,
	afPage,
	$timeout,
	$rootScope,
	$location,
    scope;

  beforeEach(inject(function ($injector) {
    afPage = $injector.get('afPage');
	$timeout = $injector.get('$timeout');
	$location = $injector.get('$location');
	$rootScope = $injector.get('$rootScope')
	scope = $rootScope.$new();
	
	var $controller = $injector.get('$controller');
	
	createController = function() {
        return $controller('DocHeaderCtrl', {
            '$scope': scope
        });
    };
  }));	

  it('should have styleId', function () {
    var ctrl =  createController();
    expect(scope.styleSheet).toEqual(Configuration.AppConfig.styleId);
  });
  
  it('should have page title', function () {
    var ctrl =  createController();
	
	//set current page to index
	$location.path('/');
	afPage.setCurrentPage();
	
	//page title will be set with a delay in the controller
	//because of $watch
	$timeout(function(){
		expect(scope.pageTitle).toEqual(Configuration.AppConfig.pages[5].title);
		}, 50);
  });
  
});
