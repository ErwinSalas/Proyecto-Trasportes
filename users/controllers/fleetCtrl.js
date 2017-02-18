/**
 * Created by Pavilion on 17/2/2017.
 */

angular.module('userModule')
    .controller('fleetIndexCtrl', function($scope,$http) {
        /* config object */


        $http.get(
            'http://transportec.azurewebsites.net/fleet/getFleet'
        ).success(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("entro", response);
            $scope.fleets = response.content;
        }).error(function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("fallo", response);
            $scope.fleets= response;
        });
        console.log( $scope.fleets)



    });
