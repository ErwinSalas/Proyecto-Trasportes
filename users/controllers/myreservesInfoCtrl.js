angular.module('userModule')
    .controller('myreservesInfoCtrl', function($scope,$location,$routeParams,ReserveResource,DriverResources) {

        checkUserType($location.absUrl().split("/")[4]);
        
        $scope.valueID = $routeParams.valueID;

        $scope.reservedDepartureDate = "";
        $scope.reservedDepartureTime = "";
        $scope.reservedArrivalDate = "";
        $scope.reservedArrivalTime = "";
        $scope.reservationStatusAPD = "";
        $scope.reservationPassengers = "";

        console.log(reserveSelectedID);
        $scope.getReserve = ReserveResource.getReserve(reserveSelectedID, function (res) {
            $scope.reserve=res;
            console.log("La resInfo ", $scope.reserve);
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
            }
            if($scope.reserve.reservationStatus == "Denied" ){
                $scope.reservationStatusAPD = "Denegada";
                $scope.addTableInfo(17,"Respuesta",$scope.reserve.responseNotes);
            }
            $scope.reservationPassengers = $scope.reserve.members.length;
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

        $scope.addTableInfo = function (num,c1,c2) {
            var table = document.getElementById("tableInfo");
            var row = table.insertRow(num);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = c1;
            cell2.innerHTML = c2;
        };

    }); 