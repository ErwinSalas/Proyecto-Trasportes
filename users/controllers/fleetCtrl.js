angular.module('userModule')
    .controller('fleetIndexCtrl', function($scope,$location,GetFleetResource) {
        checkUserType($location.absUrl());
        /* config object */
        $scope.getAllFleet=GetFleetResource.respuesta(function (res) {
            console.log("res ", res);
            $scope.fleets=res;
            for (i = 0; i < $scope.fleets.length; i++) {
                if ($scope.fleets[i].isLocked == false){
                    $scope.fleetMain.push($scope.fleets[i])
                }
            }
            document.getElementById('infoLoader').style.display = "none";
        });

        $scope.fleetMain = [];
        $scope.carSelectedID = "";

        $scope.fleetSelected = function (carID) {
            carSelectedID = carID;
            console.log("ID Salio");
            console.log(carSelectedID);

            window.location.href = '#/user/fleet/info/'+carSelectedID;

        };
    });
