angular.module('userModule')
    .controller('myreservesInfoCtrl', function($scope,$routeParams,ReserveResource) {
        /* config object */

        $scope.valueID = $routeParams.valueID;

        console.log(reserveSelectedID);
        $scope.getReserve = ReserveResource.getReserve(reserveSelectedID, function (res) {
            $scope.reserve=res;
            console.log("La resInfo ", $scope.reserve);

        });

    }); 