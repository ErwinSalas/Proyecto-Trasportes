/**
 * Created by ADRIAN on 24/3/2017.
*/
angular.module('adminModule')
    .controller('driverAdminCtrl', function($scope,DriverResources) {
    /* config object */
        $scope.newDriver={
            isActive:true
        };

        $scope.getAllDrivers=DriverResources.getDriver(function (res) {
            console.log("res ", res);
            $scope.driverAdmin=res;
    });
        $scope.choferSelectedID = "";
        $scope.driverSelected = function (choferId) {
            choferSelectedID = choferId;
            console.log("Entro ID");
            console.log("<>_<>_<>_<>_<> "+choferSelectedID);
            window.location.href = '#/admin/driverAdmin/driverAdminInfo/'+choferSelectedID;
        }
});


