/**
 * Created by ADRIAN on 24/3/2017.
 */

angular.module('adminModule')
    .controller('fleetAdminCtrl', function($scope,FleetResources) {
        /* config object */
        $scope.newCar={};
        $scope.postCar=function() {
            
            console.log("envio",$scope.newCar);
            FleetResources.setNewCar($scope.newCar);

        };
        $scope.getAllFleet=FleetResources.getFleet(function (res) {
            console.log("res ", res);
            $scope.fleetAdmin=res
        });

    });
    