
angular.module('adminModule')
    .controller('fleetAdminCtrl', function($scope,$location,FleetCarResources) {
        /* config object */
        checkUserType($location.absUrl());
        var user = JSON.parse( localStorage.getItem('session.owner') );
        $scope.newCar={
            headquarter:user.headquarter
        };

        $scope.getAllFleet=FleetCarResources.getFleet(function (res) {
            console.log("res ", res);
            $scope.fleetAdmin=res;
            for (i = 0; i < $scope.fleetAdmin.length; i++) {
                if ($scope.fleetAdmin[i].isLocked == true){
                    $scope.fleetAdmin[i].isLocked = "lock";
                }else{
                    $scope.fleetAdmin[i].isLocked = "lock_open";
                }
            }
            document.getElementById('infoLoader').style.display = "none";
        });
        
        $scope.carSelectedID = "";
        $scope.selectedId = function (carId) {
            carSelectedID = carId;
            console.log("Entro ID");
            console.log("<>_<>_<>_<>_<> "+carSelectedID);
            window.location.href = '#/admin/fleetAdmin/fleetAdminInfo/'+carSelectedID;
        };



    });
    