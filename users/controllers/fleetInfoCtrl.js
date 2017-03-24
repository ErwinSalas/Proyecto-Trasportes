angular.module('userModule')
    .controller('fleetInfoCtrl', function($scope,$routeParams,FleetCarResource) {
        /* config object */

        $scope.valueID = $routeParams.valueID;

        console.log(carSelectedID);
        $scope.getCarInfo = FleetCarResource.getCarInfo(carSelectedID, function (res) {
            $scope.carInfo=res;
            console.log("La resInfo ", $scope.carInfo);
            if($scope.carInfo.Traction == 1){
                $scope.carInfo.Traction = "Manual";
            }

        });

    }); 