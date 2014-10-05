/**
 * Created by Pluto on 2/16/14.
 */
'use strict';

angular.module('controllers')
    .controller('NavigationCtrl', ['$scope', 'afPage','page',
        function ($scope, afPage, page) {
            //Set default page data
            afPage.addPage({key: afPage.currentPage().Id, value: page});
			$scope.pageData = page;
			
        }]);