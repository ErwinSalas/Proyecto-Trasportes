angular.module('adminModule')
    .controller('reservesAdminCtrl', function($scope,$http) {
        /* config object */
        var authToken = localStorage.getItem('session.token');
        var user = JSON.parse( localStorage.getItem('session.user') );
        console.log("session use", user);
        $http({
                method: "GET",
                url: API_ROOT+'/reservation/get?filter=0&authToken={0}'
                    .format(authToken)
            }
        ).success(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("entro", response);
            $scope.reservations = response.content;
        }).error(function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("fallo", response);
            $scope.reservations= response;
        });
        console.log( $scope.reservations);

        $scope.reserveSelectedID = "";

        $scope.reserveSelected = function (reserveID) {
            /*for (reserve = 0, len = listReservation.length, result = []; reserve < len; reserve++){
             if (reserveID == listReservation[reserve].ReservationID){
             reserveSelectedArray = listReservation[reserve];
             }
             }*/
            reserveSelectedID = reserveID;
            console.log("ID Salio");
            console.log(reserveSelectedID);

            window.location.href = '#/admin/reserves/info/'+reserveSelectedID;

        };


        $scope.reservationstatus = "query_builder";

    });
