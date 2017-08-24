angular.module('adminModule')
    .controller('reservesAdminInfoCtrl', function($scope,$routeParams,ReserveResources) {
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
            if($scope.reserve.assignedDriver == null){
                $scope.reserve.assignedDriver = "No";
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

        $scope.reserveAction1 = function (action) {
            $scope.reservationStatus={
                assignedDriver :null,
                responseNotes:"justifique aqui ",
                reservationId:$scope.reserve.reservationId,
                accepted:action
            };
            console.log("envio",$scope.reservationStatus);
            ReserveResources.setReserveStatus($scope.reservationStatus);

            window.location.href = '#/admin/reserves/';

        };

        $scope.reserveAction2 = function (action) {
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
                swal("Exito!", "Solicitud procesada.", "success");
                $scope.inputAnswer = inputValue;
                $scope.reservationStatus={
                    assignedDriver :null,
                    responseNotes:$scope.inputAnswer,
                    reservationId:$scope.reserve.reservationId,
                    accepted:action
                };
                console.log("envio",$scope.reservationStatus);
                ReserveResources.setReserveStatus($scope.reservationStatus);

                window.location.href = '#/admin/reserves/';

            });

        };

        $scope.createTicket= function () {
            window.location.href = '#/admin/reserves/ticket/'+reserveSelectedID;
        };
        
    }); 