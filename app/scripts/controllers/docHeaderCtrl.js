/**
 * Created by xyj on 17/02/14.
 */
'use strict';

angular.module('controllers')
    .controller('DocHeaderCtrl', ['$scope','afPage','afConfig',
        function ($scope, afPage, afConfig) {
            //global settings
            $scope.styleSheet = afConfig.AppConfig.styleId;
            //set page title
            $scope.afPage = afPage;
            $scope.pageTitle = afPage.pageTitle();

            $scope.$watch('afPage.pageTitle()', function(newValue){
                $scope.pageTitle = newValue;
            });
            // do any other document header lifting here
        }]);