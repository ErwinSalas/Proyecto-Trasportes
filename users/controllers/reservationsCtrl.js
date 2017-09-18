
angular.module('userModule')
    .controller('reservationsCreateCtrl', function($scope,$location,$timeout,GetAvailableFleetResource,ReserveResource,FleetCarResource) {

        checkUserType($location.absUrl());
        $scope.provincesCR = provinciasCR;
        $scope.citiesCR = cantonesCR;
        $scope.districtsCR = distritosCR;
        $scope.provinceSelected = "";
        $scope.citySelected = "";
        $scope.districtSelected = "";
        $scope.additionalInfo = "";

        $scope.proName = "";
        $scope.cityName = "";
        $scope.distName = "";

        document.getElementById("citiesSetect").disabled = true;
        document.getElementById("disctrictSetect").disabled = true;

        $scope.changeP = function () {
            document.getElementById("citiesSetect").disabled = false;
            if ($scope.provinceSelected != ""){
                document.getElementById("disctrictSetect").disabled = true;
                document.getElementById("disctrictSetect").selectedIndex = -1;
            }
        };
        $scope.changeC = function () {
            document.getElementById("disctrictSetect").disabled = false;
        };

        $scope.setPlaceNames = function (valueP,valueC,valueD) {
            for (i = 0; i < $scope.provincesCR.length; i++) {
                if ($scope.provincesCR[i].ID == valueP.PID){
                    $scope.proName = $scope.provincesCR[i].Name;
                }
            }
            for (i = 0; i < $scope.citiesCR.length; i++) {
                if ($scope.citiesCR[i].ID == valueC.CID){
                    $scope.cityName = $scope.citiesCR[i].Name;
                }
            }
            for (i = 0; i < $scope.districtsCR.length; i++) {
                if ($scope.districtsCR[i].ID == valueD){
                    $scope.distName = $scope.districtsCR[i].Name;
                }
            }
        };

        $scope.carInfoDetails = function () {
            if($scope.reservation.vehicleId != null){
                var PictureCanvas = document.getElementById('img');
                PictureCanvas.src = IMG_ROOT_F+$scope.reservation.vehicleId+".jpg";
                console.log($scope.reservation.vehicleId);
                $scope.getCarInfo = FleetCarResource.getCarInfo($scope.reservation.vehicleId, function (res) {
                    $scope.carInfo=res;
                    console.log("La resInfo ", $scope.carInfo);
                });
            }
        };

        $scope.enableCarInfoBtn = function () {
            document.getElementById("carInfoBtn").style.display = 'block';
        };

        $scope.setDates=function(arrival,departure){
            $scope.reservation={
                arrival :arrival,
                departure:departure
            };
        };
        $scope.postReservation=function() {
            var user = JSON.parse( localStorage.getItem('session.owner') );
            $scope.reservation.requestingUser= user.username;
            $scope.reservation.members = $scope.members;
            $scope.setPlaceNames($scope.provinceSelected,$scope.citySelected,$scope.districtSelected);
            $scope.reservation.destinationPlace = $scope.additionalInfo + ", " + $scope.distName + ", " + $scope.cityName + ", " + $scope.proName;
            console.log($scope.reservation.destinationPlace);
            console.log("envio",$scope.reservation);
            ReserveResource.setReserve($scope.reservation);
            swal({
                title: "Exito",
                text: "La reservacion ha sido enviada.",
                type: "success",
                confirmButtonColor: "#140e39",
                timer: 1000,
                showConfirmButton: false
            });
            $timeout( function(){
                window.location.href = '#/user';
            }, 1000 );

        };
        $scope.members = [];

        $scope.agregarPasajero = function(){
            var identificationE= document.getElementById("identificationE").value;
            var firstNameE= document.getElementById("firstNameE").value;
            var lastNameE= document.getElementById("lastNameE").value;
            var placeToCollectE= document.getElementById("placeToCollectE").value;
            var placeToLeaveE= document.getElementById("placeToLeaveE").value;
            var departureHourE= document.getElementById("departureHourE").value;
            var arrivalHourE= document.getElementById("arrivalHourE").value;
            $scope.usuariosD={};
            $scope.usuariosD.identification = identificationE;
            $scope.usuariosD.firstName = firstNameE;
            $scope.usuariosD.lastName = lastNameE;
            $scope.usuariosD.placeToCollect = placeToCollectE;
            $scope.usuariosD.placeToLeave = placeToLeaveE;
            $scope.usuariosD.departureTime = departureHourE;
            $scope.usuariosD.returnTime = arrivalHourE;
            $scope.members.push($scope.usuariosD);
            console.log($scope.usuariosD);
            console.log($scope.members);

            document.getElementById("identificationE").value = "";
            document.getElementById("firstNameE").value = "";
            document.getElementById("lastNameE").value = "";
            document.getElementById("placeToCollectE").value = "";
            document.getElementById("placeToLeaveE").value = "";
            document.getElementById("departureHourE").value = "";
            document.getElementById("arrivalHourE").value = "";

            swal({
                title: "Pasajero Agregado",
                type: "success",
                confirmButtonColor: "#140e39",
                timer: 1000,
                showConfirmButton: false
            });
        };

        $scope.eliminarPasajero = function(index){
            $scope.members.splice(index, 1);
        };

        document.getElementById("btnCheck").addEventListener("click", function(){
                var arrivalDate= document.getElementById("arrivalDate").value;
                var arrivalHour= document.getElementById("arrivalHour").value;
                var departureDate= document.getElementById("departureDate").value;
                var departureHour= document.getElementById("departureHour").value;
                var urlParams = {
                    start: datetimeToUrlParameter(departureDate,departureHour),
                    end : datetimeToUrlParameter(arrivalDate,arrivalHour)
                };
                if(new Date(String(departureDate)+" "+String(departureHour))>= new Date() && new Date(String(arrivalDate)+" "+String(arrivalHour)) > new Date(String(departureDate)+" "+String(departureHour))) {
                    if (arrivalDate != null && arrivalHour != null && departureDate != null && departureHour != null){
                        $scope.getFleet = GetAvailableFleetResource.response(urlParams, function (res) {
                            console.log("res ", res);
                            $scope.fleets = res;
                            /*console.log($scope.fleets.length);
                            for (i = 0; i < $scope.fleets.length; i++) {
                                console.log($scope.fleets[i].model);
                                if ($scope.fleets[i].isLocked == true){
                                    $scope.fleets.splice(i, 1);
                                    console.log($scope.fleets[i].model)
                                }
                            }*/
                        });
                        $scope.setDates(datetimeToISO8601(arrivalDate,arrivalHour),datetimeToISO8601(departureDate,departureHour)) ;
                    }
                    swal({
                        title: "Comprobación Exitosa",
                        type: "success",
                        confirmButtonColor: "#140e39",
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
                else{

                    sweetAlert("Error...", "No existen autos disponibles en la fecha solicitada", "error");
                }
            }
        );



    });