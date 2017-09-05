angular.module('adminModule')
    .controller('reservesAdminInfoCtrl', function($scope,$route,$compile,$templateCache,$routeParams,ReserveResources,DriverResources) {
        /* config object */

        $scope.valueID = $routeParams.valueID;

        $scope.reservedDepartureDate = "";
        $scope.reservedDepartureTime = "";
        $scope.reservedArrivalDate = "";
        $scope.reservedArrivalTime = "";
        $scope.reservationStatusAPD = "";
        
        $scope.getReserve = ReserveResources.getReserve(reserveSelectedID, function (res) {
                $scope.reserve=res;
                console.log("La resInfo ", $scope.reserve);
            if($scope.reserve.requestDriver == false){
                $scope.reserve.requestDriver = "No";
            }else {
                $scope.reserve.requestDriver = "Si";
            }
            if($scope.reserve.reservationStatus == "Accepted"){
                $scope.reservationStatusAPD = "Aceptada";
                document.getElementById("pBtnD").innerHTML = "<button id='printBtn' type='button' class='btn btn-primary btn-circle-lg waves-effect waves-circle waves-float' " +
                    "style='position: fixed; bottom:2%; right: 2%' ng-click='createTicket()'><i class='material-icons'>description</i></button>";
                $compile(document.getElementById("pBtnD") )($scope);
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
            }
            $scope.reservedDepartureDate = $scope.setFormatDate($scope.reserve.departure);
            $scope.reservedArrivalDate = $scope.setFormatDate($scope.reserve.arrival);
            $scope.reservedDepartureTime = $scope.setFormatTime($scope.reserve.departure);
            $scope.reservedArrivalTime = $scope.setFormatTime($scope.reserve.arrival);
        });

        $scope.setFormatDate = function (date) {
            reserveDate = new Date(date);
            reserveYear = reserveDate.getFullYear();
            reserveMonth = reserveDate.getMonth();
            reserveDay = reserveDate.getDate();
            return reserveDay + " de " + months[reserveMonth] + " de " + reserveYear;
        };

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

        $scope.createTicket= function () {
            window.location.href = '#/admin/reserves/ticket/'+reserveSelectedID;
        };
        
    }); 