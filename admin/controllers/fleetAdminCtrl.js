/**
 * Created by ADRIAN on 24/3/2017.
 */

angular.module('adminModule')
    .controller('fleetAdminCtrl', function($scope,FleetResources,MediaFleetResource) {
        /* config object */
        $scope.newCar={
            headquarter:"SanCarlos"
        };
        $scope.postCar=function() {
            console.log("envio",$scope.newCar);
            var isPost = FleetResources.setNewCar($scope.newCar);
            if(isPost){
                MediaFleetResource.setImg($scope.newCar.vehicleId);
            }

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
        };



    });
    