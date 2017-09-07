var app = angular.module('loginModule',["ngRoute","ngResource"])
    .controller('loginController', function($scope, $http) {

        // modelo de datos.
        $scope.username = "";
        $scope.password = "";

        /**
         * Ejecuta el inicio de sesión.
         */

        $scope.doLogin = function () {
            $http({
                method: "GET",
                url: API_ROOT+'/user/login/web?username={0}&password={1}'
                    .format(Base64.toBase64($scope.username, true).toString(), Base64.toBase64($scope.password, true).toString())
            }).then(function mySucces(response) {
                console.log(response.data);
                console.log((API_ROOT + '/user/login/web?username={0}&password={1}')
                    .format(Base64.toBase64($scope.username, true).toString(), Base64.toBase64($scope.password, true).toString()))
                var meta = response.data.metadata;

                if (meta.operationResult == 'Ok') {

                    var content = response.data.content;
                    console.log(content);
                    var userData = content.user;
                    console.log(userData);
                    saveSession(content);

                    window.location.href = ('{0}'.format(userData.userType == "Admin" ? "admin" : "users"));
                } else {
                    swal({
                        title: "Credenciales incorrectas",
                        text: "Nombre de usuario o contraseña incorrectas.",
                        type: "error",
                        confirmButtonColor: "#140e39",
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            });
        };

        /**
         * Guarda la sesión en el almacenamiento local del navegador.
         * @param json JSON de origen.
         */
        function saveSession(json) {
            localStorage.setItem("session.token", json.session.token);
            localStorage.setItem("session.owner", JSON.stringify(json.user));
            console.log("Sesión guardada.");
        }
    });