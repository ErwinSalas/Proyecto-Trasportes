angular.module('adminModule')
    .controller('reservesAdminInfoCtrl', function($scope,$routeParams,ReserveResources) {
        /* config object */

        $scope.valueID = $routeParams.valueID;

        console.log(reserveSelectedID);
        $scope.getReserve = ReserveResources.getReserve(reserveSelectedID, function (res) {
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
            if($scope.reserve.AssignedDriver == null){
                $scope.reserve.AssignedDriver = "No";
            }


        });

        $scope.reserveAction = function (action) {
            $scope.reservationStatus={
                AssignedDriver :$scope.reserve.AssignedDriver,
                Justification:"justifique aqui",
                ReservationId:$scope.reserve.ReservationID,
                Status:action
            };
            console.log("envio",$scope.reservationStatus);
            ReserveResources.setReserveStatus($scope.reservationStatus);
            
            window.location.href = '#/admin/reserves/';

        };
        
    }); 