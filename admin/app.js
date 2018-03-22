angular.module('adminModule',["ngRoute","ngResource","ui.calendar"])
.config(['$routeProvider',function($routeProvider)
    {
        $routeProvider.when("/",{
                templateUrl:'index.html'
            })
            //Se conecta la vista de los mensajes con el controlador
            .when("/admin",{
                templateUrl:'dashboard.html',
                controller: 'dashboardCtrl'
            })
            .when("/admin/Ticket/ticket2",{
                templateUrl:'Ticket/ticket2.html'
            })
            //Se conecta la vista de crear flotilla
            .when("/admin/fleetAdmin/create",{
                templateUrl:'FleetAdmin/create.html',
                controller: 'fleetCreateCtrl'
            })
            //Se conecta la vista de información de la flotilla
            .when("/admin/fleetAdmin/fleetAdminInfo/:valueID",{
                templateUrl:'FleetAdmin/fleetAdminInfo.html',
                controller: 'fleetAdminInfoCtrl'
            })
            //Se conecta la vista de crear Choferes
            .when("/admin/driverAdmin/createDriver",{
                templateUrl:'DriverAdmin/createDriver.html',
                controller: 'driverCreateCtrl'
            })
            //Se conecta la vista de información de los choferes
            .when("/admin/driverAdmin/driverAdminInfo/:valueID",{
                templateUrl:'DriverAdmin/driverAdminInfo.html',
                controller: 'driverInfoCtrl'
            })
            //Se conecta la vista de reservas administrador con el controlador
            .when("/admin/reserves",{
                templateUrl:'reservesAdmi/reservesAdmin.html',
                controller: 'reservesAdminCtrl'
            })
            //Se conecta la vista de información de la reserva con el controlador
            .when("/admin/reserves/info/:valueID",{
                templateUrl:'reservesAdmi/reservesAdminInfo.html',
                controller: 'reservesAdminInfoCtrl'
            })
            //Se conecta la vista con el controlador de la flotilla
            .when("/admin/fleetAdmin",{
                templateUrl:'FleetAdmin/fleetAdmin.html',
                controller: 'fleetAdminCtrl'
            })
            //Se conecta la vista con el controlador de los choferes
            .when("/admin/driverAdmin",{
                templateUrl:'DriverAdmin/driverAdmin.html',
                controller: 'driverAdminCtrl'
            })
            //Se conecta la vista con el cotrolador de la boleta
            .when("/admin/reserves/ticket/:valueID",{
                templateUrl:'Ticket/ticket.html',
                controller: 'ticketCtrl'
            })
            .otherwise({ redirectTo: '/admin' });
    }
]);
