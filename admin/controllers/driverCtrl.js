/**
 * Modulo administrador, controlador del chofer.
 */
angular.module('adminModule')
    .controller('driverAdminCtrl', function($scope,$location,DriverResources) {
    /* config object */
        checkUserType($location.absUrl());
        $scope.newDriver={
            isActive:true
        };
        $scope.getAllDrivers=DriverResources.getDriver(function (res) {
            $scope.driverAdmin=res;
            document.getElementById('infoLoader').style.display = "none";
    });
        $scope.choferSelectedID = "";
        $scope.driverSelected = function (choferId) {
            choferSelectedID = choferId;
            window.location.href = '#/admin/driverAdmin/driverAdminInfo/'+choferSelectedID;
        }
});


