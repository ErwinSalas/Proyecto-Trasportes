angular.module('userModule',["ngRoute","ngResource"])
.config(['$routeProvider',function($routeProvider)
    {
        $routeProvider.when("/",{
                templateUrl:'index.html'
            })
            .when("/user",{
                templateUrl:'dashboard.html',
                controller: 'dashboardCtrl'
            })
            .when("/user/reserve",{
                templateUrl:'reservations/create.html',
                controller: 'reservationsCreateCtrl'
            })
            .when("/user/fleet",{
                templateUrl:'fleet/index.html',
                controller: 'fleetIndexCtrl'
            })
            .when("/user/reserves",{
                templateUrl:'reserves/myreserves.html',
                controller: 'myreservesCtrl'
            })
            .when("/user/reserves/info/:valueID",{
                templateUrl:'reserves/myreservesInfo.html',
                controller: 'myreservesInfoCtrl'
            })
            .when("/user/fleet/info/:valueID",{
                templateUrl:'fleet/fleetInfo.html',
                controller: 'fleetInfoCtrl'
            })
            .when("/user/reserves/ticket/:valueID",{
                templateUrl:'Ticket/ticket.html',
                controller: 'ticketCtrl'
            })
            .otherwise({ redirectTo: '/user' });
        
    }
]);
