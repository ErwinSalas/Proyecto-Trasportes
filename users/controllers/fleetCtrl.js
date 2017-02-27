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

    });
