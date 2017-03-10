angular.module('userModule')
    .controller('myreservesCtrl', function($scope,$http, ReserveResource) {
        /* config object */


        $http({
                method: "GET",
                url: API_ROOT+'/reservation/get?user=miguel&authToken=07a250ceead9d84a3096f8168b32a568ef203f4c79447be188f2ee194d951ef6'
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

        $scope.reserveSelectedArray = [];

        $scope.reserveSelected = function (listReservation, reserveID) {
            for (reserve = 0, len = listReservation.length, result = []; reserve < len; reserve++){
                if (reserveID == listReservation[reserve].ReservationID){
                    reserveSelectedArray = listReservation[reserve];
                }
            }
            console.log("salio");
            console.log(reserveSelectedArray)

        };

        $scope.getReserve=ReserveResource.getReserve(function (res) {
            console.log("res ", res);
            $scope.reserve=res
        });

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