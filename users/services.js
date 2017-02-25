/**
 * Created by Erwin on 27/10/2016.
 */
angular.module('userModule')

    .factory('FleetResource',function($http){

        var respuesta = function(callback){
            $http.get(
                'http://transportec.azurewebsites.net/fleet/getFleet'
            ).success(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log("entro", response);
                callback(response.content);
            }).error(function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("fallo", response);
                callback(response.content);
            });
        }
        return {respuesta: respuesta};

    });
