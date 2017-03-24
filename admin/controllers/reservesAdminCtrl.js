angular.module('adminModule')
    .controller('reservesAdminCtrl', function($scope,GetFleetResources) {
        /* config object */
        $scope.getFleet=GetFleetResources.respuesta(function (res) {
            console.log("res ", res);
            $scope.fleets=res
        });

    });
