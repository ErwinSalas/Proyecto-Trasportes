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
        .when("/admin/user/create",{
                templateUrl:'users/create.html',
                controller: 'usersCreateCtrl'
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

    }
]);
