var app = angular.module('loginModule',["ngRoute","ngResource"])
    .controller('loginController', function($scope, $http) {
        // datos desde la vista.
        $scope.username = "";
        $scope.password = "";

        $scope.doLogin = function() {
            $http({
                method : "GET",
                url : 'http://transportec.azurewebsites.net/user/login/web?username={0}&password={1}'
                    .format(Base64.toBase64($scope.username, true).toString(), Base64.toBase64($scope.password, true).toString())
            }).then(function mySucces(response) {
                console.log(response.data);
                var meta = response.data.metadata;
                if(meta.operationResult == "OK") {
                    var content = response.data.content;
                    var userData = content.owner;

                    window.location.href = ('{0}/MainView.html'.format(userData.userType == "Customer" ? "users" : "admin"));
                } else {
                    alert("Credenciales incorrectas");
                }
            });

        }
});