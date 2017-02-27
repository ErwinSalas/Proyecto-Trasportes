/**
 * Created by Erwin on 27/10/2016.
 */
angular.module('userModule')

    .factory('GetFleetResource',function($http){

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

    })


    .factory('MessageResource', function ($http) {
        var authToken = localStorage.getItem('session.token');
        var factory = {
            setMessage: function (message){
                $http({
                    method  : 'POST',
                    url     : 'http://transportec.azurewebsites.net/messages/post?authToken={0}'
                        .format(authToken),
                    data    : message

                })
                    .success(function(data) {
                        if (data.errors) {
                            // Showing errors.
                            console.log("set message error", data.errors)
                        } else {
                            console.log("set message success")
                        }
                    });
            },
            getMessages: function(callback){

                $http.get('http://transportec.azurewebsites.net/messages/getAll?authToken={0}'
                    .format(authToken)
                    )
                    .success(function successCallback(response) {
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
        };
        return factory;
    });
