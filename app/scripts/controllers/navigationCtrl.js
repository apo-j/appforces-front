/**
 * Created by Pluto on 2/16/14.
 */
'use strict';

angular.module('controllers')
    .controller('NavigationCtrl', ['$scope', 'afPage','page',
        function ($scope, afPage, page) {
			$scope.pageData = page;
        }]);