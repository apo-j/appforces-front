(function() {
  'use strict';
  /**
   * This module is used to simulate backend server for this demo application.
   */
  angular.module('content-mocks',['ngMockE2E', 'services'])
  
  .run(function($httpBackend) {

    var authorized = false;
	
	var page1 =  {
	"id": "p123",
	"title": "index"
	};
	
	// $httpBackend.whenGET('api/pages/2/p123.json').respond(function(method, url, data) {
      // if(authorized){
		// return [200, page1]
	  // }
      // return [401, 'you dont have right to access this resource'];
    // });
	
    $httpBackend.whenPOST('auth/login').respond(function(method, url, data) {
      authorized = true;
      return [200];
    });
    $httpBackend.whenPOST('auth/logout').respond(function(method, url, data) {
      authorized = false;
      return [200];
    });
	
	$httpBackend.whenPOST('api/search').respond(function(method, url, data) {
      var res1 = {
			"templateUrl":"components/accordion/1",
			"os": "sumsung 2.3",
			"ui": "sumsung",
			"searchId": "12345612"
		};
		var res2 = {
			"templateUrl":"components/accordion/2",
			"os": "Android 2.3",
			"ui": "Android",
			"searchId": "12345612"
		};
		var _data = JSON.parse(data);
	 var res = _data.criteria[0].val == _data.criteria[1].val ? res1 : res2;
      return [200, res];
    });
    
    
    $httpBackend.whenPOST('data/public').respond(function(method, url, data) {
      return [200,'I have received and processed your data [' + data + '].'];
    });
    $httpBackend.whenPOST('data/protected').respond(function(method, url, data) {
      return authorized ? [200,'This is confidential [' + data + '].'] : [401];
    });

    //otherwise

    $httpBackend.whenGET(/.*/).passThrough();

  });
})();