angular.module('adminModule')
    .controller('fleetAdminInfoCtrl', function($scope,$routeParams,FleetCarResources) {
        /* config object */
        $scope.valueID = $routeParams.valueID;
        console.log(carSelectedID);
        $scope.getCarInfo = FleetCarResources.getCarInfo(carSelectedID, function (res) {
            $scope.carInfo=res;
            console.log("La resInfo ", $scope.carInfo);
            if($scope.carInfo.Traction == 1){
                $scope.carInfo.Traction = "Manual";
            }
        });

        $scope.deleteMessage =function() {
            swal({
                title: "¿Esta seguro que desea eliminar este vehículo?",
                text: "Esta acción no podrá revertirse",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false
            }, function () {
                swal({
                    title: "Eliminado",
                    text: "El vehículo ha sido eliminado exitosamente",
                    type: "success",
                    confirmButtonColor: "#140e39",
                    timer: 1000,
                    showConfirmButton: false
                });

                $scope.deleteCar = FleetCarResources.deleteCar(carSelectedID);
                window.location.href = '#/admin/fleetAdmin/';

            });
        };
    });