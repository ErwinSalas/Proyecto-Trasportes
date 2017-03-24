angular.module('userModule')
    .controller('myreservesCtrl', function($scope,$http) {
        /* config object */


        $http({
                method: "GET",
                url: API_ROOT+'/reservation/get?user=alejandro&authToken=36f18befbb3f15c3e56dc9aea5c83bf93a8d9730689a7f7337468e078d5ba24d'
                /*.format(authToken)*/
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

            window.location.href = '#/user/reserves/info/'+reserveSelectedID;

        };


        $scope.reservationstatus = "done";

        function statusIcon(status) {
            if (status ==1){
                $scope.reservationstatus = "done";
            }
            if (status ==2){
                $scope.reservationstatus = "query_builder";
            }
            if (status ==3){
                $scope.reservationstatus = "error";
            }
        }


    });