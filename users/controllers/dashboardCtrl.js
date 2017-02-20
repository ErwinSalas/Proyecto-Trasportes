/**
 * Created by Erwin on 25/10/2016.
 */

angular.module('userModule')
    .controller('dashboardCtrl', function($scope,$http) {
    /* config object */

    var authToken = localStorage.getItem('session.token');
    console.log(authToken);
    $http({
            method: "GET",
            url: 'http://transportec.azurewebsites.net/messages/getAll?authToken={0}'
                .format(authToken)
    }

    ).success(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log("entro", response);
        $scope.messages = response.content;
    }).error(function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("fallo", response);
        $scope.messages= response;
    });




});