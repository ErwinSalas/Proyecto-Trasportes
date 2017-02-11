/**
 * Created by Erwin on 26/10/2016.
 */

angular.module('userModule')
    .controller('mainCtrl', function($scope) {
    /* config object */

       /* var usuario = JSON.parse(sessionStorage.getItem("user"));

        $scope.user = usuario.name;
        $scope.email= usuario.email;*/
        $scope.user = "Ejemplo";
        $scope.email = "Ejemplo@TEC.ac.cr";

});