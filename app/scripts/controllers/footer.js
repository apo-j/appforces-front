/**
 * Created by Pluto on 12/31/13.
 */
angular.module('controllers')
    .controller('FooterCtrl', function ($scope, $location) {


        $scope.navbarItems = [
            new navbarItem($scope.currentPage,enums.pageEnums.Main, '首页', '/'),
            new navbarItem($scope.currentPage,enums.pageEnums.About, '关于', '#/about'),
            new navbarItem($scope.currentPage,enums.pageEnums.Contact, '联系', '#/contact')
        ];
    });