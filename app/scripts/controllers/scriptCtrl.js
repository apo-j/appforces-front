/**
 * Created by Pluto on 6/19/2014.
 */
'use strict';

angular.module('controllers')
    .controller('ScriptCtrl', ['$scope','afPage','afConfig',
        function ($scope, afPage, afConfig) {
            //global settings
            $scope.scripts = afConfig.AppConfig.scripts;

            //set page title
            //$scope.pageTitle = afPage.pageTitle();
            $scope.afPage = afPage;
            $scope.$watch('afPage.pageTitle()', function(newValue){
                $scope.pageTitle = newValue;
            });
            // do any other document header lifting here
        }]);