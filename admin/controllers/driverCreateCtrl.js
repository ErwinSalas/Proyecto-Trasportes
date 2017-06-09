/**
 * Created by Pavilion on 8/6/2017.
 */
angular.module('adminModule')
    .controller('driverCreateCtrl', function($scope,DriverResources,MediaResource) {
        /* config object */
        $scope.newDriver={
            isActive:true
        };
        $scope.saveDriver=function() {
            console.log("Envio ", $scope.newDriver);
            DriverResources.setNewDriver($scope.newDriver);

            MediaResource.setImg($scope.img, $scope.newDriver.identification,1);
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