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
            }
            $scope.reservationsMain = $scope.reservationsPending;
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
            }
            if (status == "Pending"){
                $scope.reservationsMain = $scope.reservationsPending;
                $scope.reservationstatus = "query_builder";
            }
            if (status == "Denied"){
                $scope.reservationsMain = $scope.reservationsDenied;
                $scope.reservationstatus = "error";
            }
        };

    });