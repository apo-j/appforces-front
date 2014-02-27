/**
 * Created by xyj on 20/02/14.
 */
angular.module('controllers')
    .controller('LoginCtrl', ['$scope','afAuthService',
        function ($scope, afAuthService) {
            $scope.username = "";
            $scope.password = "";
            $scope.login = function(){
                afAuthService.login($scope.username, $scope.password).then(function(data){
                        afAuthService.loginConfirmed();
                },
                function(data){
                   var tt = 'dd';
                }
                );
            };

            $scope.logout = function(){
                afAuthService.logout();
            };


            // do any other document header lifting here
        }]);