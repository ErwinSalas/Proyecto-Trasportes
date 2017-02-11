/**
 * Created by Erwin on 27/10/2016.
 */
angular.module('adminModule')
.factory('UserResource',function($resource){
          return $resource("http://localhost:8000/reservations/:id",{id:"@id"},{
            update : {method:'PUT',params:{id:"@id"}}
        });
})
.factory('RequestResource',function($resource){
    return $resource("http://localhost:8000/requests/:id",{id:"@id"},{
        update : {method:'PUT',params:{id:"@id"}}
    });
})
.factory('PersonResource',function($resource){
    return $resource("http://localhost:8000/persons/:id",{id:"@id"},{
        update : {method:'PUT',params:{id:"@id"}}
    });
})
.factory('AdultResource',function($resource){
    return $resource("http://localhost:8000/adults/:id",{id:"@id"},{
        update : {method:'PUT',params:{id:"@id"}}
    });
})
.factory('ExpedientResource',function($resource){
    return $resource("http://localhost:8000/expedients/:id",{id:"@id"},{
        update : {method:'PUT',params:{id:"@id"}}
    });
});
