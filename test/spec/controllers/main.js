'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('appForce'));

  var $httpBackend,
	MainCtrl,
    scope;

  // Initialize the controller and a mock scope	
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
	scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));	

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
  
  it('should attach a list of tt', function () {
    expect(Configuration.AppConfig.appName).toEqual('tt');
  });
});
