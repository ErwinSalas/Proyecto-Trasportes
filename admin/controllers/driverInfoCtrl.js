/**
 * Created by ADRIAN on 21/4/2017.
 */
angular.module('adminModule')
    .controller('driverInfoCtrl', function($scope,$routeParams,DriversResources) {
        /* config object */
        $scope.valueID = $routeParams.valueID;
        console.log(choferSelectedID);
        $scope.getDriverInfo = DriversResources.getDriverInfo(choferSelectedID, function (res) {
            $scope.driverInfo=res;
            console.log("La resInfo ", $scope.driverInfo);

        });
    });