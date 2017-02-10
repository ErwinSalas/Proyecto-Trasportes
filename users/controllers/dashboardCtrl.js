/**
 * Created by Erwin on 25/10/2016.
 */

angular.module('adminModule')
    .controller('dashboardCtrl', function($scope) {
    /* config object */

    var usuario = JSON.parse(sessionStorage.getItem("user"));

    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };
});