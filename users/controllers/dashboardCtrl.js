/**
 * Created by Erwin on 25/10/2016.
 */

angular.module('userModule')
    .controller('dashboardCtrl', function($scope,MessageResources) {
    /* config object */
    var user = JSON.parse( localStorage.getItem('session.owner') );
        $scope.message={
            title : "Hola",
            body : "No hay servicio",
            headquarter :user.headquarter,
            owner : user.username
        };
    //$scope.messages.headquarter = "SanCarlos";
    //$scope.messages.owner = user.username;
    $scope.getMessages=MessageResources.getMessages(function (res) {
        console.log("res ", res);
        $scope.messages=res
    });
        $scope.postMessage=function() {
            console.log("envio",$scope.message)
            MessageResource.setMessage($scope.message);

        }
});