angular.module('adminModule')
    .controller('reservesAdminInfoCtrl', function($scope,$route,$templateCache,$routeParams,ReserveResources) {
        /* config object */

        $scope.valueID = $routeParams.valueID;

        $scope.reservedDepartureDate = "";
        $scope.reservedDepartureTime = "";
        $scope.reservedArrivalDate = "";
        $scope.reservedArrivalTime = "";

        console.log(reserveSelectedID);
        $scope.getReserve = ReserveResources.getReserve(reserveSelectedID, function (res) {
            $scope.reserve=res;
            console.log("La resInfo ", $scope.reserve);
            if($scope.reserve.requestDriver == false){
                $scope.reserve.requestDriver = "No";
            }else {
                $scope.reserve.requestDriver = "Si";
            }
            if($scope.reserve.reservationStatus == "Accepted" || $scope.reserve.reservationStatus == "Denied" ){
                document.getElementById("acceptBtn").style.display = "none";
                document.getElementById("deniedBtn").style.display = "none";
                document.getElementById("printBtn").style.display = "none";
                // NO seguro
            }
            if($scope.reserve.reservationStatus == "Pending" || $scope.reserve.reservationStatus == "Denied" ){
                document.getElementById("printBtn").style.display = "none";
                // NO seguro
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
            return reserveDay + " " + months[reserveMonth] + " " + reserveYear;
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
            if($scope.reserve.requestDriver == true){
                $scope.reserve.requestDriver = "No";
            }//inner
            $scope.reservationStatus={
                assignedDriver :null,
                responseNotes:"Sin justificacion",
                reservationId:$scope.reserve.reservationId,
                accepted:true
            };//no se esta justificando la reservas aceptadas
            console.log("envio",$scope.reservationStatus);
            ReserveResources.setReserveStatus($scope.reservationStatus);

            swal({
                title: "Exito",
                text: "La reservacion ha sido Procesada.",
                type: "success",
                confirmButtonColor: "#140e39",
                timer: 1000,
                showConfirmButton: false
            });

            window.location.href = '#/admin/reserves/';
            var currentPageTemplate = $route.current.templateUrl;
            $templateCache.remove(currentPageTemplate);
            $route.reload();

        };

        $scope.reserveAction2 = function () {
            $scope.inputAnswer= "";
            swal({
                title: "Justificación",
                text: "Escriba la justificación del rechazo de la reserva",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                cancelButtonText: "Cancelar",
                animation: "slide-from-top",
                inputPlaceholder: "Escriba la justificación"
            }, function (inputValue) {
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError("Debes de escribir una justificación"); return false
                }
                swal({
                    title: "Exito",
                    text: "La reservacion ha sido procesada.",
                    type: "success",
                    confirmButtonColor: "#140e39",
                    timer: 1000,
                    showConfirmButton: false
                });
                $scope.inputAnswer = inputValue;
                $scope.reservationStatus={
                    assignedDriver :null,
                    responseNotes:$scope.inputAnswer,
                    reservationId:$scope.reserve.reservationId,
                    accepted:false
                };
                console.log("envio",$scope.reservationStatus);
                ReserveResources.setReserveStatus($scope.reservationStatus);

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