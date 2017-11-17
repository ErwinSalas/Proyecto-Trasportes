
angular.module('userModule')
    .controller('mainCtrl', function($scope,$location) {
    /* config object */
    checkUserType($location.absUrl());
    var user = JSON.parse( localStorage.getItem('session.owner') );
    $scope.user = "Funcionario";
    $scope.email = user.firstName + " " + user.lastName;
    window.location.href = ('#/user');

        $scope.showAbout=function() {
            swal({
                title: "Transportec",
                text: "DESARROLLADORES\n \nLuis Alejandro Rodríguez\nAdrian Hernandez\nMiguel Rivas\nErwin Salas\n \nComunidad de Aplicaciones Móviles",
                imageUrl: "../assets/images/comunidad.png"
            });
        };
});