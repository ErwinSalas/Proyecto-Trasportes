/**
 * Created by Pavilion on 26/5/2017.
 */
angular.module('adminModule')
    .controller('fleetCreateCtrl', function($scope,$location,$timeout,FleetCarResources,MediaResource) {
        /* config object */
        checkUserType($location.absUrl());

        var user = JSON.parse( localStorage.getItem('session.owner') );

        $scope.newCar={
            headquarter: user.headquarter
        };

        $scope.errorMessage = "";

        $scope.validateCreateFleet=function () {
            /*-------------------VALIDACIONES---------------------*/
            //Validacion de marca de auto
            if($scope.newCar.brand == null || $scope.newCar.brand == ""){
                $scope.errorMessage = "Debe de digitar la marca del vehiculo";
                return false;
            }
            //Validacion de modelo de auto
            if($scope.newCar.model == null || $scope.newCar.model == ""){
                $scope.errorMessage = "Debe de digitar el modelo del vehiculo";
                return false;
            }
            //Validacion de placa de auto
            if($scope.newCar.vehicleId == null || $scope.newCar.vehicleId == ""){
                $scope.errorMessage = "Debe de digitar la placa del vehiculo";
                return false;
            }
            //Validacion de transmision de auto
            if($scope.newCar.traction == null || $scope.newCar.traction == ""){
                $scope.errorMessage = "Debe de seleccionar el tipo de transmision";
                return false;
            }
            //Validacion de capacidad de auto
            if($scope.newCar.capacity == null || $scope.newCar.capacity == ""){
                $scope.errorMessage = "Debe de digitar la capacidad del vehiculo";
                return false;
            }
            //Validacion de placa de auto
            if($scope.newCar.mileage == null || $scope.newCar.mileage == ""){
                $scope.errorMessage = "Debe de digitar el kilometraje del vehiculo";
                return false;
            }
            //Validacion de dependencia de auto
            if($scope.newCar.dependence == null || $scope.newCar.dependence == ""){
                $scope.errorMessage = "Debe de digitar la dependencia del vehiculo";
                return false;
            }
            return true;
        };
        
        $scope.postCar=function() {
            if($scope.validateCreateFleet()){
                console.log("enviPo",$scope.newCar);
                var isPost = FleetCarResources.setNewCar($scope.newCar, function (res) {
                    isPost=res;
                });
                responseData=MediaResource.setImg($scope.img,$scope.newCar.vehicleId,2);
                swal({
                    title: "Vehiculo agregado",
                    type: "success",
                    confirmButtonColor: "#140e39",
                    timer: 2000,
                    showConfirmButton: false
                });
                $timeout( function(){
                    window.location.href = '#/admin/fleetAdmin';
                }, 2000 );
            }else {
                swal({
                    title: "Campos vacios!",
                    text: $scope.errorMessage,
                    timer: 2000,
                    type: "error",
                    showConfirmButton: false
                });
            }
        };

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
                    document.getElementById('imgAddIcon').style.display = "none";
                    document.getElementById('img').style.display = "block";
                    var filePreview = document.getElementById('img');
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
    });
