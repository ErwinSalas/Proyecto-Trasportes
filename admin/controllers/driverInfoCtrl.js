/**
 * Modulo administrador, controlador de la información del chofer.
 */
angular.module('adminModule')
    .controller('driverInfoCtrl', function($scope,$location,$timeout,$routeParams,DriverResources,MediaResource) {
        /* config object */
        checkUserType($location.absUrl());
        $scope.valueID = $routeParams.valueID;
        console.log(choferSelectedID);

        var PictureCanvas = document.getElementById('img');
        PictureCanvas.src = IMG_ROOT_D+choferSelectedID+".jpg";
        
        $scope.getDriverInfo = DriverResources.getDriverInfo(choferSelectedID, function (res) {
            $scope.driverInfo=res;
            console.log("La resInfo ", $scope.driverInfo);

        });
        /**
         * Función para eleminar un mensaje.
         * Manda un mensaje de exito si no ocurre un problema de lo contrario mensaje de error.
         */
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

                $scope.deleteDriver = DriverResources.deleteDriver(choferSelectedID);
                //$scope.deleteDriverImg = MediaResource.deleteImgD(choferSelectedID);
                window.location.href = '#/admin/driverAdmin/';

            });
        };
        /**
         * Función para editar choferes.
         */
        $scope.editDriverBtn = function() {
            var showClass = document.getElementsByClassName("ShowInfo");
            var cont;
            for (cont = 0; cont < showClass.length; cont++) {
                showClass[cont].style.display = "block";
            }
            var hideClass = document.getElementsByClassName("hideInfo");
            var cont2;
            for (cont2 = 0; cont2 < hideClass.length; cont2++) {
                hideClass[cont2].style.display = "none";
            }

            var showSave = document.getElementById("ShowBtnEditSave").style.display = 'block';
            var showCancel = document.getElementById("ShowBtnEditCancel").style.display = 'block';

        };
        /**
         * Función para cancel la edicion de choferes.
         */
        $scope.cancelEditDriverBtn = function() {
            var showClass = document.getElementsByClassName("ShowInfo");
            var cont;
            for (cont = 0; cont < showClass.length; cont++) {
                showClass[cont].style.display = "none";
            }
            var hideClass = document.getElementsByClassName("hideInfo");
            var cont2;
            for (cont2 = 0; cont2 < hideClass.length; cont2++) {
                hideClass[cont2].style.display = "block";
            }

            var showEditSave = document.getElementById("ShowBtnEditSave").style.display = 'none';
            var showEditCancel = document.getElementById("ShowBtnEditCancel").style.display = 'none';
            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
        };
        $scope.newDriver={
        };
        /**
         * Función para mostrar mensaje cuando el chofer fue editado con exito o no.
         */
        $scope.postDrier=function() {
            console.log("envio",$scope.newDriver);
            DriverResources.editDriver($routeParams.valueID,$scope.newDriver);
            swal({
                title: "Chofer editado",
                type: "success",
                confirmButtonColor: "#140e39",
                timer: 2000,
                showConfirmButton: false
            });
            $timeout( function(){
                window.location.href = '#/admin/driverAdmin';
            }, 2000 );

        };
        
    });