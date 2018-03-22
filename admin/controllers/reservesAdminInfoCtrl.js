/**
 * Modulo de administrador controlador de la información de las reservas
 */
angular.module('adminModule')
    .controller('reservesAdminInfoCtrl', function($scope,$route,$location,$compile,$templateCache,$routeParams,ReserveResources,DriverResources) {
        checkUserType($location.absUrl());
        //Restablecer datos de los campos de texto
        $scope.valueID = $routeParams.valueID;
        $scope.reservedDepartureDate = "";
        $scope.reservedDepartureTime = "";
        $scope.reservedArrivalDate = "";
        $scope.reservedArrivalTime = "";
        $scope.reservationStatusAPD = "";
        $scope.reservationPassengers = "";
        /**
         * Función que recibe las reservaciones del webservices y le da formato.
         * @param ID ID de la reserva selecionada.
         * @param res res.Por la promesa.
         */
        $scope.getReserve = ReserveResources.getReserve(reserveSelectedID, function (res) {
                $scope.reserve=res;
            if($scope.reserve.requestDriver == false){
                $scope.reserve.requestDriver = "No";
            }else {
                $scope.reserve.requestDriver = "Si";
            }
            if($scope.reserve.activityType == "Administrative"){
                $scope.reserve.activityType = "Administrativa";
            }
            if($scope.reserve.activityType == "Academic"){
                $scope.reserve.activityType = "Academica";
            }
            if($scope.reserve.activityType == "Generic"){
                $scope.reserve.activityType = "Generica";
            }
            if($scope.reserve.reservationStatus == "Accepted"){
                $scope.reservationStatusAPD = "Aceptada";
                document.getElementById("pBtnD").innerHTML = "<button id='printBtn' type='button' class='btn btn-primary btn-circle-lg waves-effect waves-circle waves-float' " +
                    "style='position: fixed; bottom:2%; right: 2%' ng-click='createTicket()'><i class='material-icons'>description</i></button>";
                $compile(document.getElementById("pBtnD") )($scope);
                if($scope.reserve.responseNotes != null){
                    $scope.addTableInfo(17,"Anotaciones",$scope.reserve.responseNotes);
                }else{
                    $scope.addTableInfo(17,"Anotaciones","Sin anotaciones");
                }
                if($scope.reserve.requestDriver == "Si"){
                    $scope.getDriverInfo = DriverResources.getDriverInfo($scope.reserve.assignedDriver, function (res) {
                        $scope.driverInfo=res;
                        console.log("La resInfo ", $scope.driverInfo);
                        $scope.addTableInfo(10,"Chofer asignado",$scope.driverInfo.firstName+" "+$scope.driverInfo.lastName);
                    });
                }
            }
            if($scope.reserve.reservationStatus == "Pending" ){
                $scope.reservationStatusAPD = "Pendiente";
                document.getElementById("aBtnD").innerHTML = "<button id='acceptBtn' type='button' data-color='green' class='btn bg-green waves-effect' " +
                    "style='left: 20%; bottom: 18px' ng-click='reserveAction1()'>Aceptar</button> <button id='deniedBtn' type='button' data-color='red' " +
                    "class='btn bg-red waves-effect' style='float: right; right: 25%; bottom: 18px' ng-click='reserveAction2()'>Denegar</button>";
                $compile(document.getElementById("aBtnD") )($scope);
            }
            if($scope.reserve.reservationStatus == "Denied" ){
                $scope.reservationStatusAPD = "Denegada";
                $scope.addTableInfo(17,"Respuesta",$scope.reserve.responseNotes);
            }
            //Da formato a las fechas
            $scope.reservationPassengers = $scope.reserve.members.length;
            $scope.reservedDepartureDate = $scope.setFormatDate($scope.reserve.departure);
            $scope.reservedArrivalDate = $scope.setFormatDate($scope.reserve.arrival);
            $scope.reservedDepartureTime = $scope.setFormatTime($scope.reserve.departure);
            $scope.reservedArrivalTime = $scope.setFormatTime($scope.reserve.arrival);
        });
        /**
         * Aplica formato a una fecha.
         * @param Date Fecha.
         * @returns {String} Fecha con formato.
         */
        $scope.setFormatDate = function (date) {
            reserveDate = new Date(date);
            reserveYear = reserveDate.getFullYear();
            reserveMonth = reserveDate.getMonth();
            reserveDay = reserveDate.getDate();
            return reserveDay + " de " + months[reserveMonth] + " de " + reserveYear;
        };
        /**
         * Aplica formato a una hora.
         * @param Date hora.
         * @returns {String} Hora con formato.
         */
        $scope.setFormatTime = function (date) {
            reserveDate = new Date(date);
            reserveHours = reserveDate.getHours();
            reserveMinutes = reserveDate.getMinutes();
            reserve_AM_PM = reserveHours >= 12 ? 'pm' : 'am';
            reserveHours = reserveHours % 12;
            reserveHours = reserveHours ? reserveHours : 12;
            reserveMinutes = reserveMinutes < 10 ? '0'+reserveMinutes : reserveMinutes;
            return reserveHours + ':' + reserveMinutes + ' ' + reserve_AM_PM;
        };
        /**
         * Agregar espacios en la tabla de la información de la reserva según el estado.
         * @param Int num.
         * @param Int c1.
         * @param Int c2.
         */
        $scope.addTableInfo = function (num,c1,c2) {
            var table = document.getElementById("tableInfo");
            var row = table.insertRow(num);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = c1;
            cell2.innerHTML = c2;
        };
        /**
         * Función que responde a la administración de una reserva, ya sea aceptarla o denegarla.
         */
        $scope.reserveAction1 = function () {
            $scope.assignedDriverSelected = "";
            $scope.inputAnswerA= "";
            if($scope.reserve.requestDriver == "Si"){
                DriverResources.getDriver(function (res) {
                    $scope.drivers=res;
                });
                swal({
                    title: "Asigne un chofer",
                    text: "<div id='sCBtnD'></div>",
                    html: true,
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar",
                    inputPlaceholder: "Agregue una nota (opcional)"
                },function (inputValue) {
                    if (inputValue === false) return false;
                    if ($scope.assignedDriverSelected != ""){
                        $scope.inputAnswerA = inputValue;
                        if (inputValue === "") {
                            $scope.inputAnswerA = null;
                        }
                        $scope.setReservationStatus($scope.assignedDriverSelected,$scope.inputAnswerA,$scope.reserve.reservationId,true);
                        window.location.href = '#/admin/reserves/';
                        var currentPageTemplate = $route.current.templateUrl;
                        $templateCache.remove(currentPageTemplate);
                        $route.reload();
                    }else {
                        swal.showInputError("Debes de seleccionar un chofer para la reserva.");
                        document.getElementsByClassName("sa-input-error")[0].classList.remove('show');return false
                    }
                    });
                document.getElementById("sCBtnD").innerHTML = "<select id='DriverSelectC' name='inputS' class='form-control show-tick' ng-model='assignedDriverSelected'>" +
                    "<option ng-repeat='driver in drivers' value='{{driver.identification}}'>{{driver.firstName}}</option></select>";
                $compile(document.getElementById("sCBtnD") )($scope);
            }else {
                swal({
                        title: "¿Desea agregar una nota?",
                        text: "Agregue una nota o comentario para el usuario",
                        type: "input",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "Aceptar",
                        cancelButtonText: "Cancelar",
                        inputPlaceholder: "Agregue una nota (opcional)"
                    },function (inputValue) {
                        $scope.inputAnswerA = inputValue;
                        if (inputValue === false) return false;
                        if (inputValue === "") {
                            $scope.inputAnswerA = null;
                        }
                        $scope.setReservationStatus(null,$scope.inputAnswerA,$scope.reserve.reservationId,true);
                        console.log("dentro 1else",$scope.assignedDriverSelected,$scope.inputAnswerA);
                        window.location.href = '#/admin/reserves/';
                        var currentPageTemplate = $route.current.templateUrl;
                        $templateCache.remove(currentPageTemplate);
                        $route.reload();
                    });
            }
        };
        /**
         * Función que establece la información de respuesta de la reserva.
         * @param String aDriver(Conductor seleccionado).
         * @param String rNotes(Notas adicionales).
         * @param String rID(Id de la reserva).
         * @param Boolean rAction(True o False).
         */
        $scope.setReservationStatus = function (aDriver,rNotes,rID,rAction) {
            $scope.reservationStatus={
                assignedDriver :aDriver,
                responseNotes:rNotes,
                reservationId:rID,
                accepted:rAction
            };
            console.log("envio",$scope.reservationStatus);
            ReserveResources.setReserveStatus($scope.reservationStatus);
            swal({
                title: "Exito",
                text: "La reservación ha sido procesada.",
                type: "success",
                confirmButtonColor: "#140e39",
                timer: 1000,
                showConfirmButton: false
            });
        };
        /**
         * Función que responde a la administración de una reserva, ya sea aceptarla o denegarla.
         */
        $scope.reserveAction2 = function () {
            $scope.inputAnswer= "";
            swal({
                title: "Justificación",
                text: "Escriba la justificación del rechazo de la reserva",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                animation: "slide-from-top",
                inputPlaceholder: "Escriba una justificación"
            }, function (inputValue) {
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError("Debes de escribir una justificación"); return false
                }
                $scope.inputAnswer = inputValue;
                $scope.setReservationStatus(null,$scope.inputAnswer,$scope.reserve.reservationId,false);
                window.location.href = '#/admin/reserves/';
                var currentPageTemplate = $route.current.templateUrl;
                $templateCache.remove(currentPageTemplate);
                $route.reload();
            });
        };
        /**
         * Función que redirecciona a la segunda boleta en caso de que esta sea aceptada.
         */
        $scope.createTicket= function () {
            window.location.href = '#/admin/reserves/ticket/'+reserveSelectedID;
        };
    }); 