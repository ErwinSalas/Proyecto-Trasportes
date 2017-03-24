angular.module('starter.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(username, password) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            var USERS_LOCATION = API_ROOT+'/login/web?username={0}&password={1}'
              .format(Base64.toBase64(username, true).toString(), Base64.toBase64(password, true).toString());

      
            //console.log(usersRef.child($scope.data.username));
            if(username == null || password == null){                           //valida que el usuario no sea nulo
                deferred.reject('Wrong credentials.');
                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                }
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                }
                return promise;
            }
            else{
                usersRef.child(username).once('value', function(snapshot) {
                console.log(snapshot.val());
                var exists = (snapshot.val() !== null);
                var arrayInfoBD = eval(snapshot.val());                 //almacena el objeto o JSON obtenido de firebase, pero para ser utilzado
                if(exists){                                             //valida que el usuario exista en firebase
                    if(arrayInfoBD.Contrasena == password){                   //valida la contraseña según el json obtenido de firebase
                        deferred.resolve(arrayInfoBD.Tipo);
                        /*$cookieStore.put("name",name);
                        console.log($cookies.get("name"));*/
                    }else{
                        deferred.reject('Wrong credentials.');
                    }
                }
                else{
                    deferred.reject('Wrong credentials.');
                    promise.success = function(fn) {
                        promise.then(fn);
                        return promise;
                    }
                    promise.error = function(fn) {
                        promise.then(null, fn);
                        return promise;
                    }
                    return promise;
                    }
                });
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;


            /*

            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }*/
        }
    }
})

/**
 * Servicio de gestión de mensajes.
 */
.service("MessagesService", function ($firebaseArray, $q) {

  /**
   * Establece la fecha y hora del último mensaje en el servidor.
   * @param datetime Fecha y hora.
   */
  setLastUpdate = function (datetime) {
    var ref = new Firebase("{0}/MessagesLastUpdate".format(FIREBASE_PATH));
    ref.set(datetime);
  }

  /**
   * Comprueba la fecha y hora del último mensaje del servidor.
   * @returns {Promise} Retorna la fecha y hora del último mensaje publicado en el servidor.
   */
  checkLastUpdate = function () {
    var deferred = $q.defer();
    var promise = deferred.promise;
    var refLastUpdate = new Firebase("{0}/MessagesLastUpdate".format(FIREBASE_PATH));
    refLastUpdate.once('value', function (snapshot) {
      deferred.resolve(snapshot.val());
    });

    promise.success = function (fn) {
      promise.then(fn);
      return promise;
    }
    promise.error = function (fn) {
      promise.then(null, fn);
      return promise;
    }
    return promise;
  }

  /**
   * Descarga los mensajes disponibles en el servidor.
   * @returns {Promise}
   */
  downloadMessages = function () {
    var deferred = $q.defer();
    var promise = deferred.promise;
    var ref = new Firebase("{0}/Messages".format(FIREBASE_PATH));

    ref.once('value', function (snapshot) {
      localStorage.setItem(LS_LOCAL_MESSAGES, JSON.stringify(snapshot.val()));
      checkLastUpdate().success(function (last) {
        localStorage.setItem(LS_LOCAL_LAST_UPDATE, last);
        deferred.resolve();
      })
    });

    promise.success = function () {
      promise.then();
      return promise;
    }
    promise.error = function (fn) {
      promise.then(null, fn);
      return promise;
    }
    return promise;
  }

  return {
    /**
     * Obtiene la última actualización de mensajes disponible en el servidor.
     */
    checkLastUpdate: checkLastUpdate(),
    /**
     * Obtiene los mensajes. Si no está actualizado localmente, efectuará la descarga de los elementos más recientes.
     * @returns {Promise}
     */
    getMessages: function () {
      var deferred = $q.defer();
      var promise = deferred.promise;

      checkLastUpdate().success(function (lastUpdate) {
        if (lastUpdate == localStorage.getItem(LS_LOCAL_LAST_UPDATE)) {
          deferred.resolve(JSON.parse(localStorage.getItem(LS_LOCAL_MESSAGES)));
        } else {
          downloadMessages().success(function () {
            deferred.resolve(JSON.parse(localStorage.getItem(LS_LOCAL_MESSAGES)));
          })
        }
      })

      promise.success = function (fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function (fn) {
        promise.then(null, fn);
        return promise;
      }

      return promise;
    },

    /**
     * Publica un mensaje.
     * @param msg Mensaje a publicar.
     */
    postMessage: function (msg) {
      var today = new Date();
      var messageID = today.getFullYear().toString() + today.getMonth().toString() + today.getDate();
      var messagePath = "{0}/Messages/{1}".format(FIREBASE_PATH, messageID);
      var ref = new Firebase(messagePath);
      ref.update({
        content: msg,
        datetime: today.toISOString()
      });
      setLastUpdate(today.toISOString());
      console.log("El mensaje se ha pulicado correctamente.");
    }
  }
})

  .service('ReservasService', function($firebaseArray) {
    cargarReservas= function (listaMisReservas)
    {
      listaMisReservas = [];
      var ref = new Firebase("https://sideappprueba.firebaseio.com/Reserva");
      vehiculos = $firebaseArray(ref);
      vehiculos.$loaded()
        .then(function (data) {
          angular.forEach(data, function (value) {
             console.log(value.Placa);
            if ( value.Usuario == localStorage.getItem("user")) { // valida que no este reservado

            listaMisReservas.push({title: value.Lugar, fechaIni: value.FechaSalida});
            }

          });
          console.log(value.Placa);

        });
    };
    return{
      listaMisReservas: listaMisReservas,
      cargarRes :cargarReservas()
    }
  })

  /**
   * Servicio para actualizar el estado de una reserva, recibe un json con los datos a actualizar
   */

  .factory('EvaluarReserva',function () {

    var evaluandoReservas = function (data) {

      // SE AGREGA AL AUTO EL HORARIO DE LA RESERVA
      var reservaReference = new Firebase("https://sideappprueba.firebaseio.com/Reserva/" + data.ID); //Reserva
      var vehiculoReference = new Firebase("https://sideappprueba.firebaseio.com/Vehiculo/" + data.PlacaAuto); //Vehiculo

      var resVehiculoReference = new Firebase("https://sideappprueba.firebaseio.com/Vehiculo/" + data.PlacaAuto +"/Reservas");



      //Reserva vehiculo

      reservaReference.update({Estado: data.Estado,Justificacion:data.Justificacion,Chofer:data.Chofer,FechaLlegada:data.fLlegada,FechaSalida:data.fSalida,
        HoraLlegada:data.hLlegada,HoraSalida:data.hSalida});
      vehiculoReference.update({Estado:"Reservado"});  // Se edita el estado del vehiculo
      resVehiculoReference.child(data.ID).set({FechaLlegada:data.fLlegada,FechaSalida:data.fSalida,HoraLlegada:data.hLlegada,HoraSalida:data.hSalida}); // se agregan los horarios al vehiculo

      if(data.chofer != "No"){//SI TIENE CHOFER
        var resChoferReference = new Firebase("https://sideappprueba.firebaseio.com/Choferes/" + data.Chofer +"/Reservas");
        resChoferReference.child(data.ID).set({FechaLlegada:data.fLlegada,FechaSalida:data.fSalida});// se agregan los horarios al chofer

      }


    }
    return{
      setEstado: evaluandoReservas
    }
  })

    /**
     * Servicio para actualizar los datos de un vehiculo, recibe un json con los datos a actualizar
     */
  .factory('ActualizarVehi',function () {
    var ActVehiculo = function (data) {
      var userReference = new Firebase("https://sideappprueba.firebaseio.com/Vehiculo/" + data.ID);
      var send = {Marca:data.marca,
                  Modelo:data.modelo,
                  Traccion:data.traccion,
                  Capacidad:data.capacidad,
                  Dependencia:data.dependencia,
                  Placa:data.ID};
      userReference.update(send);
    };
    var BorrarVehiculo = function (data) {
      var userReference = new Firebase("https://sideappprueba.firebaseio.com/Vehiculo/" + data.ID);
      userReference.remove();
    };
    // var AddVehiculo = function (data) {
    //   var userReference = new Firebase("https://sideappprueba.firebaseio.com/Vehiculo/" + data.ID);
    //   var send = {Marca:data.marca, Modelo:data.modelo,Traccion:data.traccion,Capacidad:data.capacidad,Dependencia:data.dependencia,Imagen:data.imagen};
    //   userReference.update();
    // }
    return{
      AtVehiculo: ActVehiculo,
      BorraVehiculo: BorrarVehiculo
    }
  })







.service('ConsultaChoferes', function ($firebaseArray, $firebaseObject,$cordovaCamera) {
  var choferesReference = new Firebase("https://sideappprueba.firebaseio.com/Choferes");
  var listaChoferes = [];
  this.consultarChoferes = function (callback) {

    var ref = new Firebase("https://sideappprueba.firebaseio.com/Choferes");
    var data = $firebaseObject(ref);
    callback(data);

    //código reemplazado por el anterior dado que el otro utiliza three way data binding, en caso de error usar el siguiente
    /*choferes = $firebaseArray(choferesReference);
    choferes.$loaded()
      .then(function (data) {
        angular.forEach(data, function (value) {

          listaChoferes.push({id: value.$id, nombre: value.Nombre, apellidos: value.Apellidos, estado: value.Estado, image: value.image});

        });
        callback(listaChoferes);
      });*/

  };



  this.cameraSave = function(typef, callback) {
    //inicialment+e se usa la referencia directa a la base da datos, osea se insertaba la imagen directo en la tabla, ahora se
    //mudo al sistema de que se envie a al front end y de ahí guardarla con los otros datos, en caso de error o prueba descomentar lo siguiente
//    var userReference = new Firebase("https://sideappprueba.firebaseio.com/Choferes/" + cedula);
    var typeofpic;
    if(typef === "camera"){
      typeofpic = Camera.PictureSourceType.CAMERA;
    }
    else if(typef ==="gallery"){
      typeofpic =  Camera.PictureSourceType.SAVEDPHOTOALBUM;
    }
    var options = {
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : typeofpic,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 1500,
      targetHeight: 1000,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      /*userReference.update({image: imageData}).then(function() {
        alert("Image has been uploaded");
        callback(imageData);
      });*/
      callback(imageData);
    }, function(error) {
      console.error(error);
    });


    //controlador para el menu contextual con las opciones de tomar video o usar imagenes de galería

  };

  this.consultarChoferesID = function (id) {
    var ref = choferesReference+"/"+id;
    var choferes = $firebaseArray(ref);
    return choferes;
  };

  this.AddChoferesH = function (data) {
    var userReference = new Firebase("https://sideappprueba.firebaseio.com/Choferes/" + data.cedula);
    var send = {Cedula:data.cedula, Nombre:data.nombre, Apellidos: data.apellidos, Estado: data.estado, image: data.image};
    userReference.update(send);
  };

  this.borrarChofer = function (data) {
    var userReference = new Firebase("https://sideappprueba.firebaseio.com/Choferes/" + data.ID);
    userReference.remove();
  };

})

.service('ConsultasFlotilla', function ($firebaseObject) {
  //consulta los vehiculos de manera general
  this.ConsultarVehiculos = function (callback) {
    var ref = new Firebase("https://sideappprueba.firebaseio.com/Vehiculo");
    var data = $firebaseObject(ref);
    callback(data);
  };

  this.ConsultarVehiculoByID = function (placa, callback) {
    var ref = new Firebase("https://sideappprueba.firebaseio.com/Vehiculo/" + placa);
    var data = $firebaseObject(ref);
    callback(data);
  };

});
