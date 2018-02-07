
angular.module('userModule')
    .controller('mainCtrl', function($scope,$location) {
    /* config object */
    checkUserType($location.absUrl());
    var user = JSON.parse( localStorage.getItem('session.owner') );
    $scope.user = "Funcionario";
    $scope.email = user.firstName + " " + user.lastName;
    window.location.href = ('#/user');

    document.getElementById("homeTab").addEventListener("click", function(){
        document.getElementById("homeTab").classList.add("active");
        document.getElementById("reservationTab").classList.remove("active")
        document.getElementById("fleetTab").classList.remove("active")
        document.getElementById("reservesTab").classList.remove("active")
    });
    document.getElementById("reservationTab").addEventListener("click", function(){
        document.getElementById("reservationTab").classList.add("active");
        document.getElementById("homeTab").classList.remove("active")
        document.getElementById("fleetTab").classList.remove("active")
        document.getElementById("reservesTab").classList.remove("active")
    });
    document.getElementById("fleetTab").addEventListener("click", function(){
        document.getElementById("fleetTab").classList.add("active");
        document.getElementById("reservationTab").classList.remove("active")
        document.getElementById("homeTab").classList.remove("active")
        document.getElementById("reservesTab").classList.remove("active")
    });
    document.getElementById("reservesTab").addEventListener("click", function(){
        document.getElementById("reservesTab").classList.add("active");
        document.getElementById("reservationTab").classList.remove("active")
        document.getElementById("fleetTab").classList.remove("active")
        document.getElementById("homeTab").classList.remove("active")
    });

    $scope.showAbout=function() {
        swal({
            title: "Transportec",
            text: "DESARROLLADORES\n \nLuis Alejandro Rodríguez\nAdrian Hernandez\nMiguel Rivas\nErwin Salas\n \nComunidad de Aplicaciones Móviles",
            imageUrl: "../assets/images/comunidad.png"
        });
    };
});