/**
 * Created by Pluto on 2/16/14.
 */
'use strict';

angular.module('controllers')
    .controller('NavigationCtrl', ['$scope', 'afEvents', 'afPage','page',
        function ($scope, afEvents, afPage, page) {
            //Set default page data
			$scope.pageData = page.data;
        }]);