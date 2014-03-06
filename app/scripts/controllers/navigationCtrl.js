/**
 * Created by Pluto on 2/16/14.
 */
'use strict';

angular.module('controllers')
    .controller('NavigationCtrl', ['$scope', 'afPage','afConfig','page',
        function ($scope, afPage, afConfig, page) {
            afPage.setCurrentPageData(page);
        }]);