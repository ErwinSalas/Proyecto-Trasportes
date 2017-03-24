/**
 * Created by Erwin on 27/10/2016.
 */
angular.module('adminModule')
/*
 Los factory en angular estan basados en el patron de diseño factoria el cual
 deviuelve instancias de un objeto o variable en este caso es un arreglo de
 objetos json
 */
    .factory('GetFleetResources',function($http){

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
