/**
 * Created by Erwin on 29/10/2016.
 */
angular.module('userModule')
    .controller('reservationsCreateCtrl', function($scope) {
        /* config object */
        $scope.arrivalDate=null;
        $scope.arrivalHour=null;
        $scope.departureDate=null;
        $scope.departureHour=null;
        var dateTransform=dateToUrlParameter(arrival)




        $scope.reservation = {
            Arrival: dateToUrlParameter()
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