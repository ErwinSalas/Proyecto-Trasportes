/**
 * Modulo de administrador, controlador menu izquierdo de la parte de fron-end
 */
angular.module('adminModule')
    .controller('mainCtrl', function($scope,$location) {
    /* config object */
    checkUserType($location.absUrl());
    var user = JSON.parse( localStorage.getItem('session.owner') );
    $scope.user = "Administrador";
    $scope.email = user.firstName + " " + user.lastName;
    window.location.href = ('#/admin');
    //Cambiar color de los menus
    document.getElementById("homeTab").addEventListener("click", function(){
        document.getElementById("homeTab").classList.add("active");
        document.getElementById("reservesTab").classList.remove("active")
        document.getElementById("fleetTab").classList.remove("active")
        document.getElementById("driversTab").classList.remove("active")
    });
    document.getElementById("reservesTab").addEventListener("click", function(){
        document.getElementById("reservesTab").classList.add("active");
        document.getElementById("homeTab").classList.remove("active")
        document.getElementById("fleetTab").classList.remove("active")
        document.getElementById("driversTab").classList.remove("active")
    });
    document.getElementById("fleetTab").addEventListener("click", function(){
        document.getElementById("fleetTab").classList.add("active");
        document.getElementById("reservesTab").classList.remove("active")
        document.getElementById("homeTab").classList.remove("active")
        document.getElementById("driversTab").classList.remove("active")
    });
    document.getElementById("driversTab").addEventListener("click", function(){
        document.getElementById("driversTab").classList.add("active");
        document.getElementById("reservesTab").classList.remove("active")
        document.getElementById("fleetTab").classList.remove("active")
        document.getElementById("homeTab").classList.remove("active")
    });
    /**
     * Función que muestra a los desarrolladores del programa.
     */
    $scope.showAbout=function() {
        swal({
            title: "Transportec",
            text: "DESARROLLADORES\n \nLuis Alejandro Rodríguez\nAdrián Hernández\nMiguel Rivas\nErwin Salas\n \nComunidad de Aplicaciones Móviles",
            imageUrl: "../assets/images/comunidad.png"
        });
    };
});