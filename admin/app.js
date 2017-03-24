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
            templateUrl:'reservesAdmi/reservesAdmi.html',
            controller: 'reservesAdmiCtrl'

        })

    }
]);
