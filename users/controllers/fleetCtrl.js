/**
 * Created by Pavilion on 17/2/2017.
 */

angular.module('userModule')
    .controller('fleetIndexCtrl', function($scope,GetFleetResource) {
        /* config object */
        $scope.getFleet=GetFleetResource.respuesta(function (res) {
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
