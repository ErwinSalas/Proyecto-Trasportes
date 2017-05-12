/**
 * Created by ADRIAN on 21/4/2017.
 */
angular.module('adminModule')
    .controller('driverInfoCtrl', function($scope,$routeParams,DriversResources) {
        /* config object */
        $scope.valueID = $routeParams.valueID;
        console.log(choferSelectedID);
        $scope.getDriverInfo = DriversResources.getDriverInfo(choferSelectedID, function (res) {
            $scope.driverInfo=res;
            console.log("La resInfo ", $scope.driverInfo);

        });
        $scope.deleteMessageDriver =function() {
            swal({
                title: "¿Esta seguro que desea eliminar este Chofer?",
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
                    text: "El chofer ha sido eliminado exitosamente",
                    type: "success",
                    confirmButtonColor: "#140e39",
                    timer: 1000,
                    showConfirmButton: false
                });

                $scope.deleteDriver = DriversResources.deleteDriver(choferSelectedID);
                window.location.href = '#/admin/driverAdmin/';

            });
        };
    });