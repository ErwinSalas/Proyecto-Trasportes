angular.module('adminModule')
    .controller('fleetAdminInfoCtrl', function($scope,$routeParams,FleetCarResources) {
        /* config object */
        $scope.valueID = $routeParams.valueID;
        console.log(carSelectedID);
        $scope.getCarInfo = FleetCarResources.getCarInfo(carSelectedID, function (res) {
            $scope.carInfo=res;
            console.log("La resInfo ", $scope.carInfo);
            if($scope.carInfo.Traction == 1){
                $scope.carInfo.Traction = "Manual";
            }
        });
    });