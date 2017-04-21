/**
 * Created by ADRIAN on 24/3/2017.
 */

angular.module('adminModule')
    .controller('fleetAdminCtrl', function($scope,FleetResources) {
        /* config object */
        $scope.newCar={
            headquarter:"SanCarlos"
        };
        $scope.postCar=function() {
            console.log("envio",$scope.newCar);
            FleetResources.setNewCar($scope.newCar);

        };
        $scope.getAllFleet=FleetResources.getFleet(function (res) {
            console.log("res ", res);
            $scope.fleetAdmin=res
        });
     
        $scope.carSelectedID = "";
        $scope.selectedId = function (carId) {
            carSelectedID = carId;
            console.log("Entro ID");
            console.log("<>_<>_<>_<>_<> "+carSelectedID);
            window.location.href = '#/admin/fleetAdmin/fleetAdminInfo/'+carSelectedID;
        }

    });
    