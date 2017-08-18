/**
 * Created by Erwin on 26/10/2016.
 */

angular.module('userModule')
    .controller('mainCtrl', function($scope,$location) {
    /* config object */

    var user = JSON.parse( localStorage.getItem('session.owner') );
    $scope.user = "Funcionario";
    $scope.email = user.firstName + " " + user.lastName;
    window.location.href = ('#/user');

});