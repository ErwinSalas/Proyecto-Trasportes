/**
 * Created by josah on 20 nov 2016.
 */
var app = angular.module('loginModule',["ngRoute","ngResource"])
    .controller('loginController', function($scope,$http) {
        /* config object */
        $scope.username = "";
        $scope.password = "";

        var usersList = [];

        $http({
            method : "GET",
            url : "http://localhost:8000/reservations"
        }).then(function mySucces(response) {
            usersList = response.data;
            console.log(usersList);
        });

        $scope.verify = function(){

            var user = $.grep(usersList, function(current){
                return ((current.name == $scope.username) && (current.password == $scope.password))
            });

            if (user.length == 1){
                var type = user[0].type;
                if(type == "admin"){
                    sessionStorage.setItem("user", JSON.stringify(user[0]));
                    window.location.href = ('http://localhost:63342/hasc/Angular-Client/admin/MainView.html');
                }
                else if(type == "doctor"){
                    sessionStorage.setItem("user", JSON.stringify(user[0]));
                    window.location.href = ('http://localhost:63342/hasc/Angular-Client/doctors/MainView.html');
                }
            }
            else{
                alert("Usuario o contraseña incorrectos");
            }
        }
});