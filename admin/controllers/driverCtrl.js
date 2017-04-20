/**
 * Created by ADRIAN on 24/3/2017.
*/
angular.module('adminModule')
    .controller('driverAdminCtrl', function($scope,DriverResource) {
    /* config object */
        $scope.newDriver={};
        $scope.postDriver=function() {
            console.log("Envio ", $scope.newDriver);
            DriverResource.setNewDriver($scope.newDriver);
        }
        $scope.getAllDrivers=DriverResource.getDriver(function (res) {
            console.log("res ", res);
            $scope.driverAdmin=res;
    });
        console.log("hi ");
});


