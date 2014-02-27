'use strict';

angular.module('controllers')
  .controller('MainCtrl', function ($scope, afConfig) {
	$scope.cofig = afConfig;
    Configuration.CurrentPage = "index";
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
