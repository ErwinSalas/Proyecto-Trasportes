/**
 * Servicios genéricos.
 */

angular.module('sharedServices')
    .factory('FleetResource', function ($http) {
        var token = localStorage.getItem("session.token");
        return {
            checkAvailability: function (start, end) {
                $http({
                    method: 'GET',
                    url: 'http://transportec.azurewebsites.net/fleet/getAvailableVehicles?start={0}&end={1}&authToken={2}'
                        .format(start, end, token)
                }).success(function (response) {
                    if (checkOperationResult(response.metadata) == RESULT_OK) {
                        return response.content;
                    }
                })
            }
        };
    })