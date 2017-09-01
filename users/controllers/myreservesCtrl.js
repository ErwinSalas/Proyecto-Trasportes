angular.module('userModule')
    .controller('myreservesCtrl', function($scope,$http) {
        /* config object */

        var authToken = localStorage.getItem('session.token');
        var user = JSON.parse( localStorage.getItem('session.owner') );
        console.log("session use", user);
        $http({
                method: "GET",
                url: API_ROOT+'/reservation/get?user={0}&authToken={1}'
                    .format(user.username,authToken)
            }
        ).success(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("entro", response);
            $scope.reservations = response.content;
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
            }else{
                document.getElementById("noReservesAvailable").style.display = "flex";
                document.getElementById("noReservesAvailableTxt").style.display = "flex";
            }

        }).error(function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("fallo", response);
            $scope.reservations= response;
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
            return reserveDay + " de " + months[reserveMonth] + " " + reserveYear+" a las "+reserveHours + ':' + reserveMinutes + ' ' + reserve_AM_PM;
        };
        
        $scope.reserveSelectedID = "";

        $scope.reserveSelected = function (reserveID) {
            reserveSelectedID = reserveID;
            console.log("ID Salio");
            console.log(reserveSelectedID);

            window.location.href = '#/user/reserves/info/'+reserveSelectedID;

        };

        $scope.changeList = function (status) {
            if (status == "Accepted"){
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
            if (status == "Pending"){
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
            if (status == "Denied"){
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