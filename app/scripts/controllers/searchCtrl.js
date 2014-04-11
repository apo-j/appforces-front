/**
 * Created by Pluto on 2/16/14.
 */
'use strict';

angular.module('controllers')
    .controller('SearchCtrl', ['$scope','$rootScope', 'afEvents','afConfig',
        function ($scope, $rootScope, afEvents, afConfig) {

            $scope.reset = function(){
                console.log('todo');
            };

            $scope.validate = function(){
                $rootScope.$broadcast(afEvents.SEARCH, {url: afConfig.DefaultSearchUrl, data:$scope.afdata.data});
            };
        }]);