/**
 * Created by Erwin on 26/10/2016.
 */

angular.module('adminModule')
    .controller('mainCtrl', function($scope) {
    /* config object */

        /*var usuario = JSON.parse(sessionStorage.getItem("user"));*/
        $scope.user = "Ejemplo";
        $scope.email = "Ejemplo@TEC.ac.cr";
        window.location.href = ('#/admin');
});