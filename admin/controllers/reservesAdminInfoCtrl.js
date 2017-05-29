angular.module('adminModule')
    .controller('reservesAdminInfoCtrl', function($scope,$routeParams,ReserveResources) {
        /* config object */

        $scope.valueID = $routeParams.valueID;

        console.log(reserveSelectedID);
        $scope.getReserve = ReserveResources.getReserve(reserveSelectedID, function (res) {
            $scope.reserve=res;
            console.log("La resInfo ", $scope.reserve);
            if($scope.reserve.assignedDriver == null){
                $scope.reserve.assignedDriver = "No";
            }
        });

        $scope.reserveAction = function (action) {
            $scope.reservationStatus={
                assignedDriver :null,
                responseNotes:"justifique aqui",
                reservationId:$scope.reserve.reservationId,
                accepted:action
            };
            console.log("envio",$scope.reservationStatus);
            ReserveResources.setReserveStatus($scope.reservationStatus);
            
            window.location.href = '#/admin/reserves/';

        };

        $scope.createTicket= function () {
            window.location.href = '#/admin/reserves/ticket/'+reserveSelectedID;
        };
        
    }); 