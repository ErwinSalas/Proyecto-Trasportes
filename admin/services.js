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
        var user = JSON.parse( localStorage.getItem('session.owner') );
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
                    API_ROOT +'/fleet/getFleet?filter=enabled&headquarter={0}&authToken={1}'.format(user.headquarter,authToken)
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
            },
            editCar: function (carID,fleet) {
                $http({
                    method: 'POST',
                    url: API_ROOT + '/fleet/vnext/editVehicle?vehicleId={0}&authToken={1}'.format(carID, authToken),
                    data: fleet
                })
                    .success(function (data) {
                        if (data.errors) {
                            // Showing errors.
                            console.log("set message error", data.errors);
                        } else {
                            console.log("set edit success",data);
                        }
                    });
            }
        };
        return factory;
    })


    //Driver 
    .factory('DriverResources',function($http){
        var authToken = localStorage.getItem('session.token');
        var user = JSON.parse( localStorage.getItem('session.owner') );
        var factory = {
            getDriver: function(callback){
                $http.get(
                    API_ROOT +'/driver/getDrivers?filter=active&headquarter={0}&authToken={1}'.format(user.headquarter,authToken)
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
            },
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
            },
            editDriver: function (driverID,fleet) {
                $http({
                    method: 'POST',
                    url: API_ROOT + '/driver/vnext/edit?identification={0}&authToken={1}'.format(driverID, authToken),
                    data: fleet
                })
                    .success(function (data) {
                        if (data.errors) {
                            // Showing errors.
                            console.log("set message error", data.errors);
                        } else {
                            console.log("set edit success",data);
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
        var authToken = localStorage.getItem('session.token');
        var user = JSON.parse( localStorage.getItem('session.owner') );
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
        delMessage: function (id){
            $http({
                method  : 'POST',
                url     : API_ROOT + '/message/delete?msgId={0}&authToken={1}'
                    .format(id,authToken)
            })
            .success(function(data) {
                if (data.errors) {
                    // Showing errors.
                    console.log("del message error", data.errors)
                } else {
                    console.log("del message success")
                }
            });
        },
        getMessages: function(callback){
            $http.get(API_ROOT+'/message/get?headquarter={0}&authToken={1}'
                    .format(user.headquarter,authToken)
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
    .factory('MediaResource', function ($http) {
        /*
        Servicio para manejo de datos multimedia
         * */
        const diverEndPoint=1;
        const fleetEndPoint=2;
        var endPoint;
        /*
         getEndpoint obtiene el url de anclaje al servicio dependiaendo de el
         recurso solicitado. Este mismo sera representado por el parametro resourceType,
         el cual sera enviado desde el controlador donde se este llamando el servicio
          */
        var getEndPoint= function(id,resource,method){
            if (resource==diverEndPoint){
                if(method=='POST'){
                    endPoint=API_ROOT + '/driver/picture/set?driverId={0}&authToken={1}'.format(id,authToken);
                }
                else{
                    endPoint=API_ROOT+'/driver/picture/get?driverId={0}'.format(id);
                }
            }
            else if(resource==fleetEndPoint){
                if(method=='POST'){
                    endPoint=API_ROOT + '/fleet/picture/set?vehicleId={0}&authToken={1}'.format(id,authToken);
                }
                else{
                    endPoint=API_ROOT+'/fleet/picture/get?vehicleId={0}'.format(id);
                }
            }

        };
        var authToken = localStorage.getItem('session.token');
        var factory = {

            setImg: function (img,id,resourceType){
                getEndPoint(id,resourceType,'POST');
                $http({
                    method  : 'POST',
                    url     : endPoint,
                    data    : img
                })
                    .success(function(data) {
                        if (data.errors) {
                            // Showing errors.
                            console.log("set message error", data.errors)
                        } else {
                            console.log(data,"set message success")
                        }
                    });
            },
            getImg: function(id,resourceType,callback){
                getEndPoint(id,resourceType,'GET');
                $http.get(endPoint
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

