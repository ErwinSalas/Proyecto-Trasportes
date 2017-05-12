angular.module('adminModule')
    .controller('ticketCtrl', function($scope,$routeParams,ReserveResources) {
        /* config object */

        $scope.valueID = $routeParams.valueID;
        $scope.membersListTicket = [];

        console.log(reserveSelectedID);
        $scope.getReserve = ReserveResources.getReserve(reserveSelectedID, function (res) {
            $scope.reserve=res;
            console.log("EL TICKET resInfo ", $scope.reserve);
            if($scope.reserve.assignedDriver == null){
                $scope.reserve.assignedDriver = "X";
            }
            for (i = 0; i < $scope.reserve.length; i++) {
                $scope.membersListTicket.push($scope.reserve[i])
            }
        });
        

    }); 