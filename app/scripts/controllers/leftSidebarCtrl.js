/**
 * Created by xyj on 18/02/14.
 */
'use strict';

angular.module('controllers')
    .controller('LeftSidebarCtrl', ['$scope', 'afSidebar','afConfig',
        function ($scope, afSidebar, afConfig) {
                $scope.sidebar = afSidebar.get({pageId: $scope.pageData.id, position: 0});
                $scope.dataLoaded = $scope.sidebar.$resolved;
                $scope.$watch('sidebar.$resolved', function(value){
                    $scope.dataLoaded = value;
                });

        }]);