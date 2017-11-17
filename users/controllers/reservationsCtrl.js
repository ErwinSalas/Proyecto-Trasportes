
angular.module('userModule')
    .controller('reservationsCreateCtrl', function($scope,$location,$timeout,GetAvailableFleetResource,ReserveResource,FleetCarResource) {

        checkUserType($location.absUrl());

        $scope.reservation={};

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
        $scope.carInfoCheck = false;
        $scope.carInfoSize;

        $scope.usuariosD={};
        $scope.members = [];

        document.getElementById("citiesSetect").disabled = true;
        document.getElementById("disctrictSetect").disabled = true;

        $scope.changeP = function () {
            $scope.citySelected = "";
            document.getElementById("citiesSetect").disabled = false;
            document.getElementById("citiesSetect").selectedIndex = -1;
            if ($scope.provinceSelected != ""){
                $scope.districtSelected = "";
                document.getElementById("disctrictSetect").disabled = true;
                document.getElementById("disctrictSetect").selectedIndex = -1;
            }
        };
        $scope.changeC = function () {
            $scope.districtSelected = "";
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
                    $scope.carInfoSize = $scope.carInfo.capacity;
                    console.log("La resInfo ", $scope.carInfo);
                });
            }
        };

        $scope.enableCarInfoBtn = function () {
            if ($scope.carInfoCheck == false){
                document.getElementById("carInfoBtn").style.display = 'block';
                $scope.carInfoCheck = true;
            }
        };

        $scope.setDates=function(arrival,departure){
            $scope.reservation.arrival = arrival;
            $scope.reservation.departure = departure;

        };

        $scope.validateReservation=function () {
            if($scope.reservation.arrival == null || $scope.reservation.departure == null){
                return false;// fechas no proporcionadas
            }
            if($scope.reservation.vehicleId == null || $scope.reservation.vehicleId == ""){
                return false;// Vehiculo no selecionado
            }
            if($scope.reservation.requestDriver == null || $scope.reservation.requestDriver == ""){
                return false;// Chofer no selecionado
            }
            if($scope.reservation.responsable == null || $scope.reservation.responsable == ""){
                return false;// Encargado no digitado
            }
            if($scope.reservation.responsableTelephone == null || $scope.reservation.responsableTelephone == ""){
                return false;// telefono no digitado
            }
            if($scope.reservation.activityType == null || $scope.reservation.activityType == ""){
                return false;// Actividad no selecionado
            }
            if($scope.reservation.functionalCenter == null  || $scope.reservation.functionalCenter == ""){
                return false;// centro no digitado
            }
            if($scope.provinceSelected == null || $scope.provinceSelected == ""){
                return false;// Provincia no selecionado
            }
            if($scope.citySelected == null || $scope.citySelected == ""){
                return false;// canton no selecionado
            }
            if($scope.districtSelected == null || $scope.districtSelected == ""){
                return false;// distrito no selecionado
            }
            if($scope.additionalInfo == null  || $scope.additionalInfo == ""){
                return false;// señas no digitado
            }
            if($scope.reservation.justification == null  || $scope.reservation.justification == ""){
                return false;// justificacion no digitado
            }
            if($scope.members.length == 0){
                return false;// sin miembros
            }
            if(($scope.reservation.requestDriver == "false" && $scope.members.length > $scope.carInfoSize) || ($scope.reservation.requestDriver == "true" && $scope.members.length >= $scope.carInfoSize)){
                return false;// no capacidad en el carro
            }
            return true;

        };

        $scope.validateAddMember=function () {
            if($scope.usuariosD.identification == null  || $scope.usuariosD.identification == ""){
                return false;// identification no digitado
            }
            if($scope.usuariosD.firstName == null  || $scope.usuariosD.firstName == ""){
                return false;// nombre no digitado
            }
            if($scope.usuariosD.lastName == null  || $scope.usuariosD.lastName == ""){
                return false;// apellido no digitado
            }
            if($scope.usuariosD.placeToCollect == null  || $scope.usuariosD.placeToCollect == ""){
                return false;// lugar no digitado
            }
            if($scope.usuariosD.placeToLeave == null  || $scope.usuariosD.placeToLeave == ""){
                return false;// lugar no digitado
            }
            if($scope.reservation.arrival == null || $scope.reservation.departure == null){
                return false;// fechas no proporcionadas
            }
            if($scope.departureTimePassager == null  || $scope.departureTimePassager == ""){
                return false;// hora no digitado
            }
            if($scope.departureTimePassager > $scope.returnTimePassager || $scope.departureTimePassager < $scope.departureHour || $scope.departureTimePassager > $scope.arrivalHour){
                return false;// hora no digitado
            }
            if($scope.returnTimePassager == null  || $scope.returnTimePassager == ""){
                return false;// hora no digitado
            }
            if($scope.returnTimePassager < $scope.departureTimePassager || $scope.returnTimePassager < $scope.departureHour || $scope.returnTimePassager > $scope.arrivalHour){
                return false;// hora no digitado
            }
            return true;
        };

        $scope.postReservation=function() {
            if($scope.validateReservation()){
                /*var user = JSON.parse( localStorage.getItem('session.owner') );
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
                }, 1000 );*/
                alert("Exito");
            }else{
                alert("Error");
            }


        };

        $scope.agregarPasajero = function(){
            if($scope.validateAddMember()){
                var departureHourE = document.getElementById("departureHourE").value;
                var arrivalHourE = document.getElementById("arrivalHourE").value;
                $scope.usuariosD.departureTime = departureHourE;
                $scope.usuariosD.returnTime = arrivalHourE;
                $scope.members.push($scope.usuariosD);
                console.log($scope.members);
                $scope.usuariosD={};
                $scope.departureTimePassager="";
                $scope.returnTimePassager="";

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
            }else{
                alert("Error2");
            }

        };

        $scope.eliminarPasajero = function(index){
            $scope.members.splice(index, 1);
        };

        document.getElementById("btnCheck").addEventListener("click", function(){
            $scope.members = [];
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