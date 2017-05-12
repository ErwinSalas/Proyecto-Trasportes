/**
 * Created by Erwin on 25/10/2016.
 */
angular.module('adminModule',["ngRoute","ngResource","ui.calendar"])
.config(['$routeProvider',function($routeProvider)
    {
        $routeProvider.when("/admin",{
                templateUrl:'dashboard.html',
                controller: 'dashboardCtrl'
            })
            .when("/admin/user/edit",{
                templateUrl:'users/edit.html'
            })
            //Se conecta la vista de crear flotilla
            .when("/admin/fleetAdmin/create",{
                templateUrl:'FleetAdmin/create.html',
                controller: 'fleetAdminCtrl'
            })
            //Se conecta la vista de información de la flotilla 
            .when("/admin/fleetAdmin/fleetAdminInfo/:valueID",{
                templateUrl:'FleetAdmin/fleetAdminInfo.html',
                controller: 'fleetAdminInfoCtrl'
            })
            //Se conecta la vista de crear Choferes
            .when("/admin/driverAdmin/createDriver",{
                templateUrl:'DriverAdmin/createDriver.html',
                controller: 'driverAdminCtrl'
            })
            //Se conecta la vista de información de los choferes
            .when("/admin/driverAdmin/driverAdminInfo/:valueID",{
                templateUrl:'DriverAdmin/driverAdminInfo.html',
                controller: 'driverInfoCtrl'
            })

            .when("/admin/user/home",{
                templateUrl:'users/index.html',
                controller: 'usersHomeCtrl'
            })
            .when("/admin/user/edit/:id",{
                templateUrl:'users/edit.html',
                controller: 'usersEditCtrl'

            })
            .when("/admin/reserves",{
                templateUrl:'reservesAdmi/reservesAdmin.html',
                controller: 'reservesAdminCtrl'

            })
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
            .when("/admin/reserves/ticket/:valueID",{
                templateUrl:'Ticket/ticket.html',
                controller: 'ticketCtrl'

            })
    }
]);
