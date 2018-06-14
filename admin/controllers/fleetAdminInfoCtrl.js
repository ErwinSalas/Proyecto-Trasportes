/**
 * Modulo administrador, controlador de la información de la flotilla.
 */
angular.module('adminModule')
    .controller('fleetAdminInfoCtrl', function($scope,$location,$timeout,$routeParams,FleetCarResources,MediaResource) {
        /* config object */
        checkUserType($location.absUrl());
        $scope.valueID = $routeParams.valueID;
        /*$scope.getCarPicture = MediaResource.getImg(carSelectedID,2,function (res) {
            $scope.carPicture=res;
            console.log($scope.carPicture)
            var PictureCanvas = document.getElementById('img');
            PictureCanvas.src = $scope.carPicture;


        });*/
        //Consumir imagen de webservices
        var PictureCanvas = document.getElementById('img');
        PictureCanvas.src = API_ROOT+'/fleet/picture/get?vehicleId='+carSelectedID;
        $scope.iconLock = "";
        $scope.isLockedSTR = "";
        $scope.isLockedSTRAction = "";
        $scope.isLockedStatusAction = false;
        $scope.getCarInfo = FleetCarResources.getCarInfo(carSelectedID, function (res) {

            // Remove when the backend is ready
            $scope.carInfo=res;
            $scope.extraCarInfo = {gasolina:3,estado:0,observaciones:"Todo bien",kmOilChange: 0};
            $scope.extraCarInfo.kmOilChange = $scope.carInfo.mileage + 3000;
            const estados = ["En buen estado","Pendiente Revisión","En mantenimiento"]
            $scope.extraCarInfo.estado = estados[$scope.extraCarInfo.estado];
            if($scope.carInfo.Traction == 1){
                $scope.carInfo.Traction = "Manual";
            }
            if($scope.carInfo.isLocked == true){
                $scope.isLockedStatusAction = false;
                $scope.isLockedSTR = "Bloqueado";
                $scope.isLockedSTRAction = "Disponible";
                $scope.iconLock = "lock_open";
                document.getElementById("lockedBtn").className = 'btn bg-green btn-circle-lg waves-effect waves-circle waves-float';
            }
            else {
                $scope.isLockedStatusAction = true;
                $scope.isLockedSTR = "Disponible";
                $scope.isLockedSTRAction = "Bloqueado";
                $scope.iconLock = "lock_outline";
                document.getElementById("lockedBtn").className = 'btn btn-danger btn-circle-lg waves-effect waves-circle waves-float';
            }
        });
        /**
         * Funcióon para eliminar un vehículo.
         */
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
                //$scope.deleteCarImg = MediaResource.deleteImgV(carSelectedID);
                window.location.href = '#/admin/fleetAdmin/';
            });
        };
        /**
         * Función para editar el vehículo.
         */
        $scope.editCar =function() {
            var showClass = document.getElementsByClassName("ShowInfo");
            var cont;
            for (cont = 0; cont < showClass.length; cont++) {
                showClass[cont].style.display = "block";
            }
            var showClass2 = document.getElementsByClassName("hideInfo");
            var cont2;
            for (cont2 = 0; cont2 < showClass2.length; cont2++) {
                showClass2[cont2].style.display = "none";
            }
            var showEditSave = document.getElementById("ShowBtnEditSave").style.display = 'block';
            var showEditCancel = document.getElementById("ShowBtnEditCancel").style.display = 'block';
        };

        $scope.editMaintenanceInfo =function() {
            var showClass = document.getElementsByClassName("ShowInfoModal");
            var cont;
            for (cont = 0; cont < showClass.length; cont++) {
                showClass[cont].style.display = "block";
            }
            var showClass2 = document.getElementsByClassName("hideInfoModal");
            var cont2;
            for (cont2 = 0; cont2 < showClass2.length; cont2++) {
                showClass2[cont2].style.display = "none";
            }
            var showEditSave = document.getElementById("ShowBtnEditSaveModal").style.display = 'block';
            var showEditCancel = document.getElementById("ShowBtnEditCancelModal").style.display = 'block';
        };
        /**
         * Función para bloquear o desbloquear vehículo.
         */
        $scope.lockCar = function () {
            FleetCarResources.lockCar($routeParams.valueID,$scope.isLockedStatusAction);
            swal({
                title: "Vehiculo " + $scope.isLockedSTRAction,
                type: "success",
                confirmButtonColor: "#140e39",
                timer: 2000,
                showConfirmButton: false
            });
            $timeout( function(){
                window.location.href = '#/admin/fleetAdmin';
            }, 2000 );
        };
        /**
         * Función para cancelar la edición de los vehículos.
         */
        $scope.cancelModalEditInfo =function() {
            var showClass = document.getElementsByClassName("ShowInfoModal");
            var cont;
            for (cont = 0; cont < showClass.length; cont++) {
                showClass[cont].style.display = "none";
            }
            var showClass2 = document.getElementsByClassName("hideInfoModal");
            var cont2;
            for (cont2 = 0; cont2 < showClass2.length; cont2++) {
                showClass2[cont2].style.display = "block";
            }
            var showEditSave = document.getElementById("ShowBtnEditSaveModal").style.display = 'none';
            var showEditCancel = document.getElementById("ShowBtnEditCancelModal").style.display = 'none';
            //Restablecer valores de los campos de texto
            document.getElementById("MaintenanceModel").value = "";
            document.getElementById("MaintenanceTraction").value = "";
            document.getElementById("CarStatus").value = "";
            document.getElementById("MaintenanceMileage").value = "";
            document.getElementById("Observations").value = "";
        };

        $scope.cancelEditCar =function() {
            var showClass = document.getElementsByClassName("ShowInfo");
            var cont;
            for (cont = 0; cont < showClass.length; cont++) {
                showClass[cont].style.display = "none";
            }
            var showClass2 = document.getElementsByClassName("hideInfo");
            var cont2;
            for (cont2 = 0; cont2 < showClass2.length; cont2++) {
                showClass2[cont2].style.display = "block";
            }
            var showEditSave = document.getElementById("ShowBtnEditSave").style.display = 'none';
            var showEditCancel = document.getElementById("ShowBtnEditCancel").style.display = 'none';
            //Restablecer valores de los campos de texto
            document.getElementById('img').style.display = "none";//temporalmente se oculta por fallos en webservices
            document.getElementById('imgE').style.display = "none";
            document.getElementById("file-upload").value = "";
            document.getElementById("brand").value = "";
            document.getElementById("model").value = "";
            document.getElementById("traction").value = "";
            document.getElementById("capacity").value = "";
            document.getElementById("mileage").value = "";
            document.getElementById("dependence").value = "";
        };
        /**
         * Función para convertir una imagen de base 64 a multipar.
         * Esta función esta compuesta de readFile y de urltoFile.
         * @returns {multipar} Retorna la imagen.
         */
        function urltoFile(url, filename, mimeType){
            return (fetch(url)
                    .then(function(res){return res.arrayBuffer();})
                    .then(function(buf){return new File([buf], filename, {type:mimeType});})
            );
        }
        function readFile(evt) {
            var files = evt.target.files; // FileList object
            // Obtenemos la imagen del campo "file".
            for (var i = 0, f; f = files[i]; i++) {
                var reader = new FileReader();
                reader.onload = (function(e) {
                    document.getElementById('img').style.display = "none";
                    document.getElementById('imgE').style.display = "block";
                    var filePreview = document.getElementById('imgE');
                    //e.target.result contents the base64 data from the image uploaded
                    filePreview.src = e.target.result;
                    $scope.img=e.target.result;
                });
                reader.readAsDataURL(f);
            }
            setTimeout(function(){
                urltoFile($scope.img, 'image.jpg', 'multipart/form-data')
                    .then(function(file){
                        console.log("Soy la imagen",file);
                        $scope.img = file;
                    })
            }, 1000);
        }
        document.getElementById('file-upload').addEventListener('change', readFile, false);
        //Inicializa Json
        $scope.newFleet={
        };
        $scope.newExtraInfo={};
        $scope.postExtraInfo=function() {
            $('#ExtraInfoModal').modal('hide');
            //FleetCarResources.editCarExtraInfo($routeParams.valueID,$scope.newExtraInfo);
            swal({
                title: "Pendiente de Crear Endpoint",
                type: "success",
                confirmButtonColor: "#140e39",
                timer: 2000,
                showConfirmButton: false
            });
            $timeout( function(){
                window.location.href = '#/admin/fleetAdmin';
            }, 2000 );
        };
        /**
         * Función que muestra mensaje de exito cuando se edita me vehículo .
         */
        $scope.postFleet=function() {
            FleetCarResources.editCar($routeParams.valueID,$scope.newFleet);
            if($scope.img != null){
                MediaResource.setImg($scope.img,carSelectedID,2);
            }
            swal({
                title: "Vehiculo editado",
                type: "success",
                confirmButtonColor: "#140e39",
                timer: 2000,
                showConfirmButton: false
            });
            $timeout( function(){
                window.location.href = '#/admin/fleetAdmin';
            }, 2000 );
        };
    });