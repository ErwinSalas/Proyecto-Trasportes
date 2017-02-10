/**
 * Created by Erwin on 29/10/2016.
 */
angular.module('adminModule')
    .controller('usersCreateCtrl', function($scope,UserResource,$location, $timeout) {
        /* config object */
        $scope.user = {};
        $scope.saveUser = function() {
            UserResource.save($scope.user);
            $location.path('#/admin/user');
        };

    })
    .controller('usersEditCtrl', function($scope, UserResource, $location, $timeout, $routeParams) {
    $scope.title = "Editar usuario";
    $scope.button = "Actualizar";
    $scope.user = UserResource.get({
        id: $routeParams.id
    });

    $scope.saveUser = function() {
        UserResource.update($scope.user);
        $location.path('#/admin/user');
    };
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