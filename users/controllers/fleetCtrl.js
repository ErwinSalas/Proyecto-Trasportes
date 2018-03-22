/**
 * Modulo usuario, controlar de la flotilla.
 */
angular.module('userModule')
    .controller('fleetIndexCtrl', function($scope,$location,GetFleetResource) {
        checkUserType($location.absUrl());
        /* config object */
        /**
         * Función para obtener la lista de los vehículos.
         * @param res res. Parte de la promesa
         * @returns {res}.
         */
        $scope.getAllFleet=GetFleetResource.respuesta(function (res) {
            console.log("res ", res);
            $scope.fleets=res;
            for (i = 0; i < $scope.fleets.length; i++) {
                if ($scope.fleets[i].isLocked == false){
                    $scope.fleetMain.push($scope.fleets[i])
                }
            }
            document.getElementById('infoLoader').style.display = "none";
        });
        $scope.fleetMain = [];
        $scope.carSelectedID = "";
        $scope.fleetSelected = function (carID) {
            carSelectedID = carID;
            window.location.href = '#/user/fleet/info/'+carSelectedID;
        };
    });
