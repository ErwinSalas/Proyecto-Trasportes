/**
 * Created by Pavilion on 17/2/2017.
 */

angular.module('adminModule')
    .controller('fleetIndexCtrl', function($scope,FleetResource,$location, $timeout) {
        /* config object */
        $scope.fleets = FleetResource.query();
        console.log($scope.fleets)



    });
