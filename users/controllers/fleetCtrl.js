/**
 * Created by Pavilion on 17/2/2017.
 */

angular.module('userModule')
    .controller('fleetIndexCtrl', function($scope,FleetResource) {
        /* config object */
        $scope.fleets = FleetResource.query();
        console.log($scope.fleets)



    });
