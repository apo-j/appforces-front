/**
 * Created by xyj on 17/02/14.
 */
'use strict';

angular.module('controllers')
    .controller('DocHeaderCtrl', ['$scope','afPage','afConfig',
        function ($scope, afPage, afConfig) {
            //global settings

            //set page title
            //$scope.pageTitle = afPage.pageTitle();
            $scope.afPage = afPage;
            $scope.$watch('afPage.pageTitle()', function(newValue){
                $scope.pageTitle = newValue;
            });
            // do any other document header lifting here
        }]);