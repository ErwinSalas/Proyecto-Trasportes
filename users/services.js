/**
 * Created by Erwin on 27/10/2016.
 */
angular.module('userModule')
.factory('UserResource',function($resource){
          return $resource("http://localhost:8000/reservations/:id",{id:"@id"},{
            update : {method:'PUT',params:{id:"@id"}}
        });
})


.factory('FleetResource',function($resource){
    return $resource("transportec.azurewebsites.net/fleet/getFleet",{id:"@id"},{
        update : {method:'PUT',params:{id:"@id"}}
    });
});
