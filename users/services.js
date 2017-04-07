/**
 * Created by Erwin on 27/10/2016.
 */
angular.module('userModule')
    /*
    Los factory en angular estan basados en el patron de diseño factoria el cual
    deviuelve instancias de un objeto o variable en este caso es un arreglo de
    objetos json
    */
    .factory('GetFleetResource',function($http){

        var respuesta = function(callback){
            $http.get(
                API_ROOT +'/fleet/getFleet'
            ).success(function successCallback(response) {
                // Esta funcion es la que se ejecuta
                // cuando la peticion es exitosa
                //response es la variable en la que se devuelven los datos
                //En este caso particular nuestro response esta estructurado de manera que
                //los datos que interesan estan en el atributo content
                //Se devuelve un callback el cual se ejecuta en el controller
                callback(response.content);
            }).error(function errorCallback(response) {
                //En caso de fallo en la peticion entra en esta funcion
                console.log("fallo", response);
                callback(response.content);
            });
        };
        return {respuesta: respuesta};

    })
    .factory('GetAvailableFleetResource',function($http){
        var authToken = localStorage.getItem('session.token');

        var res = function(data,callback){
            $http.get(
                API_ROOT +'/fleet/getAvailableVehicles?start={0}&end={1}&authToken={2}'
                    .format(data.start,data.end,authToken)
            ).success(function successCallback(response) {
                // Esta funcion es la que se ejecuta
                // cuando la peticion es exitosa
                //response es la variable en la que se devuelven los datos
                //En este caso particular nuestro response esta estructurado de manera que
                //los datos que interesan estan en el atributo content
                //Se devuelve un callback el cual se ejecuta en el controller
                callback(response.content);
            }).error(function errorCallback(response) {
                //En caso de fallo en la peticion entra en esta funcion
                console.log("fallo", response);
                callback(response.content);
            });
        };
        return {response: res};

    })


    .factory('MessageResource', function ($http) {
        /*
        * */
        var authToken = localStorage.getItem('session.token');
        var factory = {

            setMessage: function (message){
                $http({
                    method  : 'POST',
                    url     : API_ROOT + '/messages/post?authToken={0}'
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

                $http.get(API_ROOT+'/messages/getAll?authToken={0}'
                    .format(authToken)
                    )
                    .success(function successCallback(response) {
                        //
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
    })

    .factory('FleetCarResource', function ($http) {
        var authToken = localStorage.getItem('session.token');
        var factory = {
            getCarInfo: function (carID, callback) {
                $http({
                        method: "GET",
                        url: API_ROOT+'/fleet/getVehicle?vehicleId={0}&authToken={1}'.format(carID, authToken)
                    }
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
        };
        return factory;
    })

    .factory('ReserveResource', function ($http) {
        var authToken = localStorage.getItem('session.token');
        var factory = {
            getReserve: function (reserveID, callback) {
                $http({
                        method: "GET",
                        url: API_ROOT+'/reservation/get?id={0}&authToken={1}'.format(reserveID, authToken)
                    }
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
            },
            setReserve: function (reservation) {
                $http({
                    method: 'POST',
                    url: API_ROOT + '/reservation/reserve?authToken={0}'
                        .format(authToken),
                    data: reservation

                })
                    .success(function (data) {
                        if (data.errors) {
                            // Showing errors.
                            console.log("set message error", data.errors);
                        } else {
                            console.log("set reservation success",data);
                        }
                    });
            }
        };
        return factory;
    });
