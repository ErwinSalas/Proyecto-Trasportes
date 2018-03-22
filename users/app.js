/*
* modulo app usuarios
 */
angular.module('userModule',["ngRoute","ngResource"])
.config(['$routeProvider',function($routeProvider)
    {
        $routeProvider.when("/",{
                templateUrl:'index.html'
            })
        //Se conecta la vista de los mensajes con el controlador
            .when("/user",{
                templateUrl:'dashboard.html',
                controller: 'dashboardCtrl'
            })
            //Se muestra la vista de crear reservas
            .when("/user/reserve",{
                templateUrl:'reservations/create.html',
                controller: 'reservationsCreateCtrl'
            })
            //Se muestra la vista de flotilla
            .when("/user/fleet",{
                templateUrl:'fleet/index.html',
                controller: 'fleetIndexCtrl'
            })
            //Se muestra la vista de mis reservas
            .when("/user/reserves",{
                templateUrl:'reserves/myreserves.html',
                controller: 'myreservesCtrl'
            })
            //Se muestra la vista de información de mi reserva
            .when("/user/reserves/info/:valueID",{
                templateUrl:'reserves/myreservesInfo.html',
                controller: 'myreservesInfoCtrl'
            })
            //Se muestra la vista del vehículo seleccionado
            .when("/user/fleet/info/:valueID",{
                templateUrl:'fleet/fleetInfo.html',
                controller: 'fleetInfoCtrl'
            })
            //Se muestra la vista de la boleta de la reserva seleccionada
            .when("/user/reserves/ticket/:valueID",{
                templateUrl:'Ticket/ticket.html',
                controller: 'ticketCtrl'
            })
            .otherwise({ redirectTo: '/user' });
        
    }
]);
