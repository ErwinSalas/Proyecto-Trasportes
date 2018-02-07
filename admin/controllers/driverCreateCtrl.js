/**
 * Created by Pavilion on 8/6/2017.
 */
angular.module('adminModule')
    .controller('driverCreateCtrl', function($scope,$location,$timeout,DriverResources,MediaResource) {
        /* config object */
        checkUserType($location.absUrl());
        var user = JSON.parse( localStorage.getItem('session.owner') );
        $scope.newDriver={
            isActive:true,
            headquarter:user.headquarter
        };
        $scope.validateCreateDriver=function () {
            /*-------------------VALIDACIONES---------------------*/
            //Validacion de identificación de chofer
            if($scope.newDriver.identification == null || $scope.newDriver.identification == ""){
                //alert("Error, debe seleccionar digitar identificación");
                return false;
            }
            //Validacion de nombre de chofer
            if($scope.newDriver.firstName == null || $scope.newDriver.firstName == ""){
                //alert("Error, debe seleccionar digitar nombre");
                return false;
            }
            //Validacion de apellido de chofer
            if($scope.newDriver.lastName == null || $scope.newDriver.lastName == ""){
                //alert("Error, debe seleccionar digitar los apellidos");
                return false;
            }
        };
        $scope.saveDriver=function() {
            if(validateCreateDriver()){
                console.log("Envio ", $scope.newDriver);
                DriverResources.setNewDriver($scope.newDriver);
                responseData=MediaResource.setImg($scope.img, $scope.newDriver.identification,1);
                swal({
                    title: "Chofer agregado",
                    type: "success",
                    confirmButtonColor: "#140e39",
                    timer: 2000,
                    showConfirmButton: false
                });
                $timeout( function(){
                    window.location.href = '#/admin/driverAdmin';
                }, 2000 );
            }else {
                swal({
                    title: "Campos vacios!",
                    text: "El espacio no puede ir en blanco",
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