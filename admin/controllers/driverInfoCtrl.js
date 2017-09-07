/**
 * Created by ADRIAN on 21/4/2017.
 */
angular.module('adminModule')
    .controller('driverInfoCtrl', function($scope,$location,$timeout,$routeParams,DriverResources) {
        /* config object */
        checkUserType($location.absUrl().split("/")[4]);
        $scope.valueID = $routeParams.valueID;
        console.log(choferSelectedID);

        var PictureCanvas = document.getElementById('img');
        PictureCanvas.src = IMG_ROOT_D+choferSelectedID+".jpg";
        
        $scope.getDriverInfo = DriverResources.getDriverInfo(choferSelectedID, function (res) {
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

                $scope.deleteDriver = DriverResources.deleteDriver(choferSelectedID);
                window.location.href = '#/admin/driverAdmin/';

            });
        };

        $scope.editDriverBtn = function() {
            var x = document.getElementsByClassName("ShowInfo");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "block";
            }
            var x2 = document.getElementsByClassName("hideInfo");
            var i2;
            for (i2 = 0; i2 < x2.length; i2++) {
                x2[i2].style.display = "none";
            }

            var x3 = document.getElementById("ShowBtnEditSave").style.display = 'block';
            var x4 = document.getElementById("ShowBtnEditCancel").style.display = 'block';

        };

        $scope.cancelEditDriverBtn = function() {
            var x = document.getElementsByClassName("ShowInfo");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            var x2 = document.getElementsByClassName("hideInfo");
            var i2;
            for (i2 = 0; i2 < x2.length; i2++) {
                x2[i2].style.display = "block";
            }

            var  x3 = document.getElementById("ShowBtnEditSave").style.display = 'none';
            var x4 = document.getElementById("ShowBtnEditCancel").style.display = 'none';
            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
        };

        $scope.newDriver={

        };
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