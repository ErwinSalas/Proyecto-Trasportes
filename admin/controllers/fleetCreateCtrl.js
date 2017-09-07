/**
 * Created by Pavilion on 26/5/2017.
 */
angular.module('adminModule')
    .controller('fleetCreateCtrl', function($scope,$location,$timeout,FleetCarResources,MediaResource) {
        /* config object */
        checkUserType($location.absUrl().split("/")[4]);
        $scope.newCar={
            headquarter:"SanCarlos"
        };
        $scope.postCar=function() {
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
