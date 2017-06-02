/**
 * Created by Pavilion on 26/5/2017.
 */
angular.module('adminModule')
    .controller('fleetCreateCtrl', function($scope,$timeout,FleetCarResources,MediaFleetResource) {
        /* config object */
        $scope.newCar={
            headquarter:"SanCarlos"
        };
        $scope.postCar=function() {
            console.log("envio",$scope.newCar);
            var isPost = FleetCarResources.setNewCar($scope.newCar, function (res) {
                isPost=res;
            });
            responseData=MediaFleetResource.setImg($scope.img,$scope.newCar.vehicleId);
            console.log(responseData);

            swal({
                title: "Vehiculo agregado",
                type: "success",
                confirmButtonColor: "#140e39",
                timer: 1000,
                showConfirmButton: false
            });
            $timeout( function(){
                window.location.href = '#/admin/fleetAdmin';
            }, 1000 );

        };
        function readFile(evt) {
            var files = evt.target.files; // FileList object

            // Obtenemos la imagen del campo "file".
            for (var i = 0, f; f = files[i]; i++) {

                var reader = new FileReader();

                reader.onload = (function(e) {
                    var filePreview = document.getElementById('img');
                    //e.target.result contents the base64 data from the image uploaded
                    filePreview.src = e.target.result;
                    $scope.img=e.target.result;
                });

                reader.readAsDataURL(f);
            }
        }

        document.getElementById('file-upload').addEventListener('change', readFile, false);




    });
