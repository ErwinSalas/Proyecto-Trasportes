//Controlador de crear chofer
angular.module('adminModule')
    .controller('driverCreateCtrl', function($scope,$location,$timeout,DriverResources,MediaResource) {
        /* config object */
        checkUserType($location.absUrl());
        var user = JSON.parse( localStorage.getItem('session.owner') );
        $scope.newDriver={
            isActive:true,
            headquarter:user.headquarter
        };
        /**
         * Función para validar que no este vacio el campon de identificación.
         * @returns {Boolean} True o False.
         */
        $scope.errorMessage = "";
        $scope.validateCreateDriver=function () {
            /*-------------------VALIDACIONES---------------------*/
            //Validacion de identificación de chofer
            if($scope.newDriver.identification == null || $scope.newDriver.identification == "" || isNaN($scope.newDriver.identification)== true){
                $scope.errorMessage = "Debe de digitar la identificación";
                return false;
            }
            //Validacion de nombre de chofer
            if($scope.newDriver.firstName == null || $scope.newDriver.firstName == ""){
                $scope.errorMessage = "Debe de digitar el nombre del conductor";
                return false;
            }
            //Validacion de apellido de chofer
            if($scope.newDriver.lastName == null || $scope.newDriver.lastName == ""){
                $scope.errorMessage = "Debe de digitar los apellidos del conductor";
                return false;
            }
            return true;
        };
        /**
         * Función para guardar un chofer, si se guarda bien muestra mensaje de exito sino muestra mensaje de error.
         */
        $scope.saveDriver=function() {
            if($scope.validateCreateDriver()){
                console.log("Envio ", $scope.newDriver);
                $scope.newDriver.identification = $scope.newDriver.identification.toString();
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
                    text: $scope.errorMessage,
                    timer: 2000,
                    type: "error",
                    showConfirmButton: false
                });
            }
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