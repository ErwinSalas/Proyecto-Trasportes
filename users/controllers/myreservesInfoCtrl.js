angular.module('userModule')
    .controller('myreservesInfoCtrl', function($scope,$routeParams,ReserveResource) {
        
        $scope.valueID = $routeParams.valueID;

        $scope.reservedDepartureDate = "";
        $scope.reservedDepartureTime = "";
        $scope.reservedArrivalDate = "";
        $scope.reservedArrivalTime = "";

        console.log(reserveSelectedID);
        $scope.getReserve = ReserveResource.getReserve(reserveSelectedID, function (res) {
            $scope.reserve=res;
            console.log("La resInfo ", $scope.reserve);
            if($scope.reserve.requestDriver == false){
                $scope.reserve.requestDriver = "No";
            }else {
                $scope.reserve.requestDriver = "Si";
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

    }); 