/**
 * Modulo administrador, controlar de la flotilla.
 */
angular.module('adminModule')
    .controller('fleetAdminCtrl', function($scope,$location,FleetCarResources) {
        /* config object */
        checkUserType($location.absUrl());
        var user = JSON.parse( localStorage.getItem('session.owner') );
        $scope.newCar={
            headquarter:user.headquarter
        };
        /**
         * Función para obtener la lista de los vehículos.
         * @param res res. Parte de la promesa 
         * @returns {res}.
         */
        $scope.getAllFleet=FleetCarResources.getFleet(function (res) {
            console.log("res ", res);
            $scope.fleetAdmin=res;
            for (i = 0; i < $scope.fleetAdmin.length; i++) {
                if ($scope.fleetAdmin[i].isLocked == true){
                    $scope.fleetAdmin[i].isLocked = "lock";
                }else{
                    $scope.fleetAdmin[i].isLocked = "lock_open";
                }
            }
            document.getElementById('infoLoader').style.display = "none";
        });
        $scope.carSelectedID = "";
        $scope.selectedId = function (carId) {
            carSelectedID = carId;
            window.location.href = '#/admin/fleetAdmin/fleetAdminInfo/'+carSelectedID;
        };
    });
    