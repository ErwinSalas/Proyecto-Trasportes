/**
 * Created by ADRIAN on 24/3/2017.
*/
angular.module('adminModule')
    .controller('driverAdminCtrl', function($scope,GetDriverResource) {
    /* config object */
    $scope.getDrivers=GetDriverResource.respuesta(function (res) {
        console.log("res ", res);
        $scope.driverAdmin=res
    });
        console.log("hi ");
});