/**
 * Created by Adrian on 28/04/2017.
 */
angular.module('adminModule')
    .controller('dashboardCtrl', function($scope,MessageResource) {
        /* config object */
        var user = JSON.parse( localStorage.getItem('session.owner') );
        $scope.message={
            headquarter :user.headquarter,
            owner : user.username
        };
        $scope.getMessages=MessageResource.getMessages(function (res) {
            console.log("res ", res);
            $scope.messages=res
        });
        $scope.postMessage=function() {
            console.log("envio",$scope.message)
            MessageResource.setMessage($scope.message);
        };
        $scope.deleteMessages=function(id){
            MessageResource.delMessage(id);
        };
    });