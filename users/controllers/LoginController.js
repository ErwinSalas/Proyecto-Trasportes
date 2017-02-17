app.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $firebaseArray, $state) {

  $scope.data = {};
  $scope.saveSession = false;

  $scope.login = function() {
    LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {

      // Establece una variable que determina si se debe recordar la sesión.
      

      if(data == "Administrador") {
        localStorage.setItem("user", $scope.data.username);
        localStorage.setItem("userType", "admin");
        $state.go('appAdmin.inicioAdmin');
        console.log("Sesión iniciada: ADMINISTRADOR");
      } else {
        localStorage.setItem("user", $scope.data.username);
        localStorage.setItem("userType", "customer");
        $state.go('app.inicio');
        console.log("Sesión iniciada: USUARIO");
      }
    }).error(function(data) {
      $ionicPopup.alert({
        title: 'Error de inicio de sesión',
        template: 'Las credenciales introducidas son inválidas. Por favor, inténtelo de nuevo.'
      });
    });
  };

  /**
   * Modifica el valor de la variable que determina si se debe recordar la sesión.
   */
  $scope.cbxOnChange = function () {
    $scope.saveSession = !$scope.saveSession;
    console.log("Recordar sesión: {0}".format($scope.saveSession));
  };
})
