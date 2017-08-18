/**
 * Created by Erwin on 26/10/2016.
 */

angular.module('adminModule')
    .controller('mainCtrl', function($scope) {
    /* config object */

    var user = JSON.parse( localStorage.getItem('session.owner') );
    $scope.user = "Administrador";
    $scope.email = user.firstName + " " + user.lastName;
    window.location.href = ('#/admin');
});