angular.module('userModule')
    .controller('myreservesInfoCtrl', function($scope,$http) {
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
            $scope.reservationsInfo = response.content;
        }).error(function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("fallo", response);
            $scope.reservationsInfo= response;
        });
        console.log( $scope.reservationsInfo);


    }); 