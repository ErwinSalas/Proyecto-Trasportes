/**
 * Modulo de usuarios, controlador de las reservas
 */
angular.module('userModule')
    .controller('reservationsCreateCtrl', function($scope,$location,$timeout,GetAvailableFleetResource,ReserveResource,FleetCarResource) {

        checkUserType($location.absUrl());
        //Restablece los datos 
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
        $scope.errorMessages = "";
        $scope.errorMessagesPassager = "";

        $scope.usuariosD={};
        $scope.members = [];

        document.getElementById("citiesSetect").disabled = true;
        document.getElementById("disctrictSetect").disabled = true;
        /**
         * Función que cambia los cantones dependiendo de la provincia seleccionada
         */
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
        /**
         * Función para seleccionar el distrito
         */
        $scope.changeC = function () {
            $scope.districtSelected = "";
            document.getElementById("disctrictSetect").disabled = false;
        };
        /**
         * Función que guarda la provicia, canton y distrito asignado en las variables
         */
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
        /*
        * Función que muestra la imagen del auto seleccionado
        */
        $scope.carInfoDetails = function () {
            if($scope.reservation.vehicleId != null && $scope.reservation.vehicleId != ""){
                var PictureCanvas = document.getElementById('img');
                PictureCanvas.src = IMG_ROOT_F+$scope.reservation.vehicleId+".jpg";
                $scope.getCarDetailsInfo();

            }
        };
        /*
        * Función que muestra la información del auto seleccionado
        */
        $scope.getCarDetailsInfo = function () {
            console.log($scope.reservation.vehicleId);
            $scope.getCarInfo = FleetCarResource.getCarInfo($scope.reservation.vehicleId, function (res) {
                $scope.carInfo=res;
                $scope.carInfoSize = $scope.carInfo.capacity;
                console.log("La resInfo ", $scope.carInfo);
            });
        };
        /*
        * Función que habilita el boton de ver información de vehículo
        */
        $scope.enableCarInfoBtn = function () {
            if ($scope.carInfoCheck == false){
                document.getElementById("carInfoBtn").style.display = 'block';
                $scope.carInfoCheck = true;
            }
        };
        /*
        * Función que coloca las fechas de salida y llegada
        */
        $scope.setDates=function(arrival,departure){
            $scope.reservation.arrival = arrival;
            $scope.reservation.departure = departure;
        };
        /*
        *Función que valida los campos de la reserva
        */
        $scope.validateReservation=function () {
            $scope.getCarDetailsInfo();
            if($scope.reservation.arrival == null || $scope.reservation.departure == null){
                $scope.errorMessages = "Seleccione una fecha para la reserva";
                return false;// fechas no proporcionadas
            }
            if($scope.reservation.vehicleId == null || $scope.reservation.vehicleId == ""){
                $scope.errorMessages = "Seleccione un vehiculo";
                return false;// Vehiculo no selecionado
            }
            if($scope.reservation.requestDriver == null || $scope.reservation.requestDriver == ""){
                $scope.errorMessages = "Seleccione si desea chofer";
                return false;// Chofer no selecionado
            }
            if($scope.reservation.responsable == null || $scope.reservation.responsable == ""){
                $scope.errorMessages = "Digite el nombre del responsable de la reserva";
                return false;// Encargado no digitado
            }
            if($scope.reservation.responsableTelephone == null || $scope.reservation.responsableTelephone == "" || isNaN($scope.reservation.responsableTelephone)== true){
                $scope.errorMessages = "Digite el telefono del responsable usando numeros";
                return false;// telefono no digitado
            }
            if($scope.reservation.activityType == null || $scope.reservation.activityType == ""){
                $scope.errorMessages = "Seleccione el tipo de actividad";
                return false;// Actividad no selecionado
            }
            if($scope.reservation.functionalCenter == null  || $scope.reservation.functionalCenter == ""){
                $scope.errorMessages = "Digite el centro funcional";
                return false;// centro no digitado
            }
            if($scope.provinceSelected == null || $scope.provinceSelected == ""){
                $scope.errorMessages = "Seleccione la provincia de destino";
                return false;// Provincia no selecionado
            }
            if($scope.citySelected == null || $scope.citySelected == ""){
                $scope.errorMessages = "Seleccione el cantón de destino";
                return false;// canton no selecionado
            }
            if($scope.districtSelected == null || $scope.districtSelected == ""){
                $scope.errorMessages = "Seleccione el distrito de destino";
                return false;// distrito no selecionado
            }
            if($scope.additionalInfo == null  || $scope.additionalInfo == ""){
                $scope.errorMessages = "Digite otras señas del destino";
                return false;// señas no digitado
            }
            if($scope.reservation.justification == null  || $scope.reservation.justification == ""){
                $scope.errorMessages = "Digite una justificacion para la reserva";
                return false;// justificacion no digitado
            }
            if($scope.members.length == 0){
                $scope.errorMessages = "Digite la información de los pasajeros";
                return false;// sin miembros
            }
            if(($scope.reservation.requestDriver == "false" && $scope.members.length > $scope.carInfoSize) || ($scope.reservation.requestDriver == "true" && $scope.members.length >= $scope.carInfoSize)){
                $scope.errorMessages = "El vehiculo seleccionado no tiene capacidad para los pasajeros digitados";
                return false;// no capacidad en el carro
            }
            return true;

        };
        /**
         * Función de validación de los pasajeros los cuales van hacer agregados a la reserva
         */
        $scope.validateAddMember=function () {
            if($scope.usuariosD.identification == null  || $scope.usuariosD.identification == ""){
                $scope.errorMessagesPassager = "Digite la identificacion del pasajero";
                return false;// identification no digitado
            }
            if($scope.usuariosD.firstName == null  || $scope.usuariosD.firstName == ""){
                $scope.errorMessagesPassager = "Digite el nombre completo del pasajero";
                return false;// nombre no digitado
            }
            if($scope.usuariosD.lastName == null  || $scope.usuariosD.lastName == ""){
                $scope.errorMessagesPassager = "Digite los apellidos del pasajero";
                return false;// apellido no digitado
            }
            if($scope.usuariosD.placeToCollect == null  || $scope.usuariosD.placeToCollect == ""){
                $scope.errorMessagesPassager = "Digite el punto de encuentro";
                return false;// lugar no digitado
            }
            if($scope.usuariosD.placeToLeave == null  || $scope.usuariosD.placeToLeave == ""){
                $scope.errorMessagesPassager = "Digite el lugar donde sera dejado";
                return false;// lugar no digitado
            }
            if($scope.reservation.arrival == null || $scope.reservation.departure == null){
                $scope.errorMessagesPassager = "Seleccione las horas de salida y llegada";
                return false;// fechas no proporcionadas
            }
            if($scope.departureTimePassager == null  || $scope.departureTimePassager == ""){
                $scope.errorMessagesPassager = "Seleccione hora de salida del pasajero";
                return false;// hora no digitado
            }
            if($scope.departureTimePassager < $scope.departureHour){
                $scope.errorMessagesPassager = "Horas incorrectas";
                return false;// hora no digitado
            }
            if($scope.returnTimePassager == null  || $scope.returnTimePassager == ""){
                $scope.errorMessagesPassager = "Seleccione hora de llegada del pasajero";
                return false;// hora no digitado
            }
            if($scope.returnTimePassager > $scope.arrivalHour){
                $scope.errorMessagesPassager = "Horas incorrectas";
                return false;// hora no digitado
            }
            return true;
        };
        /**
         * Función que publica el mensaje de reservación con exito al webservices
        */
        $scope.postReservation=function() {
            if($scope.validateReservation()){
                var user = JSON.parse( localStorage.getItem('session.owner') );
                $scope.reservation.responsableTelephone = $scope.reservation.responsableTelephone.toString();
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
            }else{
                swal({
                    title: "Campos vacios!",
                    text: $scope.errorMessages,
                    timer:2000,
                    type: "error",
                    showConfirmButton: false
                });
            }
        };
        /*
        * Función que agrega a un pasajero a la lista de la reserva
        */
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
                swal({
                    title: "Campos vacios!",
                    text: $scope.errorMessagesPassager,
                    timer:2000,
                    type: "error",
                    showConfirmButton: false
                });
            }
        };
        /*
        *Función que elimina a los usuarios de la lista de pasajeros.
        */
        $scope.eliminarPasajero = function(index){
            $scope.members.splice(index, 1);
        };
        /*
        *Función que verifica que hay vehículos disponibles para la fecha y hora seleccionada
        * Además da aviso al usuario si hay disponibilidad
        */
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
                if(new Date(String(departureDate)+" "+String(departureHour))>= new Date() && new Date(String(arrivalDate)+" "+String(arrivalHour)) > new Date(String(departureDate)+" "+String(departureHour)) && arrivalHour != null && departureHour != null && arrivalHour != "" && departureHour != "") {

                    $scope.getFleet = GetAvailableFleetResource.response(urlParams, function (res) {
                        console.log("res ", res);
                        $scope.fleets = res;
                    });
                    $scope.setDates(datetimeToISO8601(arrivalDate,arrivalHour),datetimeToISO8601(departureDate,departureHour)) ;
                    document.getElementById("vehicleIdSelect").value = "";
                    $scope.reservation.vehicleId = "";
                    document.getElementById("carInfoBtn").style.display = 'none';
                    $scope.carInfoCheck = false;

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