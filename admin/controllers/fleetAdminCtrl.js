/**
 * Created by ADRIAN on 24/3/2017.
 */

angular.module('adminModule')
    .controller('fleetAdminCtrl', function($scope,FleetCarResources) {
        /* config object */
        $scope.newCar={
            headquarter:"SanCarlos"
        };

        $scope.getAllFleet=FleetCarResources.getFleet(function (res) {
            console.log("res ", res);
            $scope.fleetAdmin=res
        });
     
        $scope.carSelectedID = "";
        $scope.selectedId = function (carId) {
            carSelectedID = carId;
            console.log("Entro ID");
            console.log("<>_<>_<>_<>_<> "+carSelectedID);
            window.location.href = '#/admin/fleetAdmin/fleetAdminInfo/'+carSelectedID;
        };



    });
    