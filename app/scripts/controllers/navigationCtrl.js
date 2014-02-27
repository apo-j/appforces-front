/**
 * Created by Pluto on 2/16/14.
 */
'use strict';

angular.module('controllers')
    .controller('NavigationCtrl', ['$scope', 'afPage','afConfig','page','$location',
        function ($scope, afPage, afConfig, page, $location) {
                $scope.pageData = page;
        }]);