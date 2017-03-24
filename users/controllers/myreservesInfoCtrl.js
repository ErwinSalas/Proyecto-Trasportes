angular.module('userModule')
    .controller('myreservesInfoCtrl', function($scope,$routeParams,ReserveResource) {
        /* config object */

        $scope.valueID = $routeParams.valueID;

        console.log(reserveSelectedID);
        $scope.getReserve = ReserveResource.getReserve(reserveSelectedID, function (res) {
            $scope.reserve=res;
            console.log("La resInfo ", $scope.reserve);
            if($scope.reserve.Status == 0){
                $scope.reserve.Status = "Pendiente";
            }
            if($scope.reserve.Status == 1){
                $scope.reserve.Status = "Aceptado";
            }
            if($scope.reserve.Status == 2){
                $scope.reserve.Status = "Denegado";
            }


        });

    }); 