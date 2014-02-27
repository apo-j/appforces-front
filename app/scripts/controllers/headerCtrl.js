/**
 * Created by Pluto on 12/30/13.
 */
'use strict';

angular.module('controllers')
    .controller('HeaderCtrl', ['$scope', 'afHeader',
        function ($scope, afHeader) {
            $scope.dataLoaded = false;//this line is not necessary
            afHeader.get({pageId: $scope.pageData.id},function(data){
                $scope.header = data;
                $scope.dataLoaded = true;
            });

           /*
            $scope.header = afHeader.get({pageId: $scope.pageData.id});
           $scope.dataLoaded = $scope.header.$resolved;
            $scope.$watch('header.$resolved', function(value){
                $scope.dataLoaded = value;
            });*/


    }]);