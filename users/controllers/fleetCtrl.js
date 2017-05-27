/**
 * Created by Pavilion on 17/2/2017.
 */

angular.module('userModule')
    .controller('fleetIndexCtrl', function($scope,FleetCarResources) {
        /* config object */
        $scope.getAllFleet=FleetCarResources.getFleet(function (res) {
            console.log("res ", res);
            $scope.fleets=res
        });

        $scope.carSelectedID = "";

        $scope.fleetSelected = function (carID) {
            carSelectedID = carID;
            console.log("ID Salio");
            console.log(carSelectedID);

            window.location.href = '#/user/fleet/info/'+carSelectedID;

        };
    });
