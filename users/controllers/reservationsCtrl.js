/**
 * Created by Erwin on 29/10/2016.
 */
angular.module('userModule')
    .controller('reservationsCreateCtrl', function($scope) {
        /* config object */
        $scope.user = {};


    })



    .controller('usersHomeCtrl', function($scope,UserResource,$location, $timeout) {
    /* config object */
    $scope.users = UserResource.query();

    $scope.removeUser = function(id) {
        UserResource.delete({
            id: id
        });
        $location.path('#/admin/user');
    };

});