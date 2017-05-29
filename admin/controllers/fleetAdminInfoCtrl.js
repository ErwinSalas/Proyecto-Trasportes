angular.module('adminModule')
    .controller('fleetAdminInfoCtrl', function($scope,$routeParams,FleetCarResources) {
        /* config object */
        $scope.valueID = $routeParams.valueID;
        console.log(carSelectedID);
        $scope.getCarInfo = FleetCarResources.getCarInfo(carSelectedID, function (res) {
            $scope.carInfo=res;
            console.log("La resInfo ", $scope.carInfo);
            if($scope.carInfo.Traction == 1){
                $scope.carInfo.Traction = "Manual";
            }
        });

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
                window.location.href = '#/admin/fleetAdmin/';

            });
        };

        $scope.editCar =function() {
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

        $scope.cancelEditCar =function() {
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

            var x3 = document.getElementById("ShowBtnEditSave").style.display = 'none';
            var x4 = document.getElementById("ShowBtnEditCancel").style.display = 'none';
            document.getElementById("brand").value = "";
            document.getElementById("model").value = "";
            document.getElementById("traction").value = "";
            document.getElementById("capacity").value = "";
            document.getElementById("mileage").value = "";
            document.getElementById("dependence").value = "";
        };

        $scope.newFleet={

        };
        $scope.postFleet=function() {
            console.log("envio",$scope.newFleet);


        };

    });