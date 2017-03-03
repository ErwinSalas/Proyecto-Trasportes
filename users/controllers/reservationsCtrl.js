/**
 * Created by Erwin on 29/10/2016.
 */
angular.module('userModule')
    .controller('reservationsCreateCtrl', function($scope,GetAvailableFleetResource) {
        /* config object */
        $scope.arrivalDate=null;
        $scope.arrivalHour=null;
        $scope.departureDate=null;
        $scope.departureHour=null;

        var urlParams = {
            start: datetimeToUrlParameter(arrivalDate,arrivalHour),
            end : datetimeToUrlParameter(departureDate,departureHour)

        };
        function inputDateHandler(e){
            $scope.getFleet=GetAvailableFleetResource.respuesta(urlParams,function (res) {
                console.log("res ", res);
                $scope.fleets=res
            });
        }



});