/**
 * Created by Pluto on 12/30/13.
 */
angular.module('controllers')
    .controller('ContactCtrl', function ($scope) {
        $scope.currentPage = enums.pageEnums.Contact;
    });