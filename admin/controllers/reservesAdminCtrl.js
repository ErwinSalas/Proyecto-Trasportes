angular.module('adminModule')
    .controller('reservesAdminCtrl', function($scope,$location,$compile,ReserveResources) {
        
        checkUserType($location.absUrl());
        
        $scope.getAllReservations = ReserveResources.getReservations(function (res) {
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

        console.log( $scope.reservations);

        $scope.reservationsMain = [];
        $scope.reservationsAcepted = [];
        $scope.reservationsPending = [];
        $scope.reservationsDenied = [];

        $scope.reservationstatus = "query_builder";

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

        $scope.reserveSelectedID = "";

        $scope.reserveSelected = function (reserveID) {
            reserveSelectedID = reserveID;
            console.log("ID Salio");
            console.log(reserveSelectedID);

            window.location.href = '#/admin/reserves/info/'+reserveSelectedID;

        };

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
