/**
 * Modulo de usuario, controlador de las reservas
 */
angular.module('userModule')
    .controller('myreservesCtrl', function($scope,$location,$compile,ReserveResource) {

        checkUserType($location.absUrl());
        /**
         * Aplica formato a una fecha.
         * @param res res. Por la promesa
         * @returns {res} res.
         */
        $scope.getReservations = ReserveResource.getReservations(function (res) {
            $scope.reservations=res;
            $scope.noReservationsText = "Usted no posee reservas.";
            if ($scope.reservations.length > 0){
                for (i = 0; i < $scope.reservations.length; i++) {
                    if ($scope.reservations[i].reservationStatus == "Accepted"){
                        $scope.reservationsAcepted.push($scope.reservations[i])
                    }
                    if ($scope.reservations[i].reservationStatus == "Pending"){
                        $scope.reservationsPending.push($scope.reservations[i])
                    }
                    if ($scope.reservations[i].reservationStatus == "Denied"){
                        $scope.reservationsDenied.push($scope.reservations[i])
                    }
                    $scope.reservations[i].requestDateTime = $scope.setFormatDateTime($scope.reservations[i].requestDateTime);
                }
                $scope.reservationsMain = $scope.reservationsPending;
                if ($scope.reservationsMain == 0){
                    document.getElementById("noReservesAvailable").style.display = "flex";
                    document.getElementById("noReservesAvailableTxt").style.display = "flex";
                    $scope.noReservationsText = "Usted no posee reservas pendientes.";
                }
            }else{
                document.getElementById("noReservesAvailable").style.display = "flex";
                document.getElementById("noReservesAvailableTxt").style.display = "flex";
            }
            document.getElementById("actBtns").innerHTML = "<button type='button' class='btn bg-green btn-circle-lg waves-effect waves-circle waves-float' " +
                "style='position: fixed; bottom:20%; right: 2%' ng-click='changeList(1)'><i class='material-icons'>done</i></button><button type='button' " +
                "class='btn bg-blue btn-circle-lg waves-effect waves-circle waves-float' style='position: fixed; bottom:11%; right: 2%' ng-click='changeList(0)'>" +
                "<i class='material-icons'>query_builder</i></button><button type='button' class='btn bg-red btn-circle-lg waves-effect waves-circle waves-float' " +
                "style='position: fixed; bottom:2%; right: 2%' ng-click='changeList(2)'><i class='material-icons'>error</i></button>"
            $compile(document.getElementById("actBtns") )($scope);
            document.getElementById('infoLoader').style.display = "none";
        });
        //Inicialización de las listas
        $scope.reservationsMain = [];
        $scope.reservationsAcepted = [];
        $scope.reservationsPending = [];
        $scope.reservationsDenied = [];
        $scope.reservationstatus = "query_builder";
        /**
         * Función para darle formato a las horas y fechas.
         * @param Date Fecha and  Hours.
         * @returns {String} Fecha con formato.
         */
        $scope.setFormatDateTime = function (date) {
            reserveDate = new Date(date);
            reserveYear = reserveDate.getFullYear();
            reserveMonth = reserveDate.getMonth();
            reserveDay = reserveDate.getDate();
            reserveHours = reserveDate.getHours();
            reserveMinutes = reserveDate.getMinutes();
            reserve_AM_PM = reserveHours >= 12 ? 'pm' : 'am';
            reserveHours = reserveHours % 12;
            reserveHours = reserveHours ? reserveHours : 12;
            reserveMinutes = reserveMinutes < 10 ? '0'+reserveMinutes : reserveMinutes;
            return reserveDay + " de " + months[reserveMonth] + " de " + reserveYear+" - "+reserveHours + ':' + reserveMinutes + ' ' + reserve_AM_PM;
        };
        //Restablece el campo del ID
        $scope.reserveSelectedID = "";
        /**
         * Redirecciona a la reserva seleccionada.
         * @param ID reserva.
         */
        $scope.reserveSelected = function (reserveID) {
            reserveSelectedID = reserveID;
            window.location.href = '#/user/reserves/info/'+reserveSelectedID;
        };
        /**
         * Función para cambiar los estados entre las reservas.
         * @param String Estdo de la reserca.
         */
        $scope.changeList = function (status) {
            if (status == 1){
                $scope.reservationsMain = $scope.reservationsAcepted;
                $scope.reservationstatus = "done";
                if ($scope.reservationsAcepted.length == 0){
                    document.getElementById("noReservesAvailable").style.display = "flex";
                    document.getElementById("noReservesAvailableTxt").style.display = "flex";
                    $scope.noReservationsText = "Usted no posee reservas aceptadas.";
                }else{
                    document.getElementById("noReservesAvailable").style.display = "none";
                    document.getElementById("noReservesAvailableTxt").style.display = "none";
                }
            }
            if (status == 0){
                $scope.reservationsMain = $scope.reservationsPending;
                $scope.reservationstatus = "query_builder";
                if ($scope.reservationsPending.length == 0){
                    document.getElementById("noReservesAvailable").style.display = "flex";
                    document.getElementById("noReservesAvailableTxt").style.display = "flex";
                    $scope.noReservationsText = "Usted no posee reservas pendientes.";
                }else{
                    document.getElementById("noReservesAvailable").style.display = "none";
                    document.getElementById("noReservesAvailableTxt").style.display = "none";
                }
            }
            if (status == 2){
                $scope.reservationsMain = $scope.reservationsDenied;
                $scope.reservationstatus = "error";
                if ($scope.reservationsDenied.length == 0){
                    document.getElementById("noReservesAvailable").style.display = "flex";
                    document.getElementById("noReservesAvailableTxt").style.display = "flex";
                    $scope.noReservationsText = "Usted no posee reservas denegadas.";
                }else{
                    document.getElementById("noReservesAvailable").style.display = "none";
                    document.getElementById("noReservesAvailableTxt").style.display = "none";
                }
            }
        };

    });