/**
 * Created by Erwin on 27/10/2016.
 */
angular.module('userModule')
    .factory('UserResource',function($resource){
          return $resource("http://localhost:8000/reservations/:id",{id:"@id"},{
            update : {method:'PUT',params:{id:"@id"}}
        });
    })
    /*.factory('FleetResource',function($resource){
        return $resource("http://transportec.azurewebsites.net/fleet/getFleet/:id",{id:"@id"},{
            update : {method:'PUT',params:{id:"@id"}}
        });
    })*/


    .factory('FleetResource',function($http){
        /* return $resource("/:id",{id:"@id"},{
        update : {method:'PUT',params:{id:"@id"}}
        });*/
        var fleet={
            dataV: $http.get(
                'http://transportec.azurewebsites.net/fleet/getFleet'
            ).success(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log("entro", response);
                return response;
            }).error(function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("fallo", response);
                return response;
            })
        };




    });
