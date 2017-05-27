/**
 * Created by ADRIAN on 24/3/2017.
 */
angular.module('adminModule')
/*
 Los factory en angular estan basados en el patron de diseño factoria el cual
 deviuelve instancias de un objeto o variable en este caso es un arreglo de
 objetos json

 Estos objetos encapsulan las funciones para obtener crear editar y borrar datos de un recurso especifico
 algunos de estas funciones devuelben callbacks los cuales son ejecutados cuando sean necesarios del lado
 del controlador

 */
    //Fleet
    .factory('FleetCarResources', function ($http) {
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
            },
            getFleet: function ( callback) {
                $http.get(
                    API_ROOT +'/fleet/getFleet?filter=all&headquarter=SanCarlos&authToken={0}'.format(authToken)
                ).success(function successCallback(response) {
                    // Esta funcion es la que se ejecuta
                    // cuando la pet    icion es exitosa
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
            },
            setNewCar: function (fleet,callback) {
                $http({
                    method: 'POST',
                    url: API_ROOT + '/fleet/addVehicle?authToken={0}'.format(authToken),
                    data: fleet
                })
                .success(function (data) {
                    callback(data);

                }).error(function(data){
                    console.log("error setNewCar",data);
                    callback(data);
                });
            },
            deleteCar: function (carID) {
                $http({
                    method: 'POST',
                    url: API_ROOT + '/fleet/deleteVehicle?vehicleId={0}&authToken={1}'.format(carID, authToken)
                })
                    .success(function (data) {
                        if (data.errors) {
                            // Showing errors.
                            console.log("set message error", data);
                        } else {
                            console.log("delete car success",data);
                        }
                    });
            }
        };
        return factory;
    })


    //Driver 
    .factory('DriverResource',function($http){
        var authToken = localStorage.getItem('session.token');
        var factory = {
            getDriver: function(callback){
                $http.get(
                    API_ROOT +'/driver/getDrivers?filter=active&headquarter=SanCarlos&authToken={0}'.format(authToken)
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
            },
            setNewDriver: function (driver) {
                $http({
                    method: 'POST',
                    url: API_ROOT + '/driver/add?authToken={0}'.format(authToken),
                    data: driver
                })
                    .success(function (data) {
                        if (data.errors) {
                            // Showing errors.
                            console.log("set message error", data);
                        } else {
                            console.log("set new driver success",data);
                        }
                    });
            }
        }
        return factory;
    })


    .factory('DriversResources', function ($http) {
        var authToken = localStorage.getItem('session.token');
        var factory = {
            getDriverInfo: function (driverID, callback) {
                $http({
                        method: "GET",
                        url: API_ROOT+'/driver/getDriver?driverId={0}&authToken={1}'.format(driverID, authToken)
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
            deleteDriver: function (driverId) {
                $http({
                    method: 'POST',
                    url: API_ROOT + '/driver/delete?id={0}&authToken={1}'.format(driverId, authToken)
                })
                    .success(function (data) {
                        if (data.errors) {
                            // Showing errors.
                            console.log("set message error", data);
                        } else {
                            console.log("delete car success",data);
                        }
                    });
            }
        };
        return factory;
    })
    .factory('ReserveResources', function ($http) {
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
            setReserveStatus: function (reservation) {
                $http({
                    method: 'POST',
                    url: API_ROOT + '/reservation/reply?authToken={0}'
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
    })
    .factory('MessageResource', function ($http) {
    /*
     * */
    var authToken = localStorage.getItem('session.token');
    var factory = {

        setMessage: function (message){
            $http({
                method  : 'POST',
                url     : API_ROOT + '/message/post?authToken={0}'
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
            $http.get(API_ROOT+'/message/get?headquarter=SanCarlos&authToken={0}'
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
    .factory('MediaFleetResource', function ($http) {
        /*
         * */
        var authToken = localStorage.getItem('session.token');
        var factory = {

            setImg: function (img,id){
                $http({
                    method  : 'POST',
                    url     : API_ROOT + '/fleet/changePicture?vehicleId={0}&authToken={1}'
                        .format(id,authToken),
                    data    : img
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
            getImg: function(id,callback){
                $http.get(API_ROOT+'/fleet/getPicture?vehicleId={0}&authToken={1}'
                        .format(id,authToken)
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
    });

