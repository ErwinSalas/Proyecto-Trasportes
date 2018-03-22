//Controlador de mensajes de los usuarios
angular.module('userModule')
    .controller('dashboardCtrl', function($scope,$location,MessageResources) {
    /* config object */
    checkUserType($location.absUrl());
    var user = JSON.parse( localStorage.getItem('session.owner') );
    $scope.getMessages=MessageResources.getMessages(function (res) {
        console.log("res ", res);
        $scope.messages=res;
        for (i = 0; i < $scope.messages.length; i++) {
            $scope.messages[i].publish = $scope.setFormatDateTime($scope.messages[i].publish);
        }
    });
    /**
     * Aplica formato a una fecha.
     * @param Date Fecha.
     * @returns {String} Fecha con formato.
     */
    $scope.setFormatDateTime = function (date) {
        reserveDate = new Date(date);
        reserveYear = reserveDate.getFullYear();
        reserveMonth = reserveDate.getMonth();
        reserveDay = reserveDate.getDate();
        reserveHours = reserveDate.getHours();
        reserveMinutes = reserveDate.getMinutes();
        reserve_AM_PM = reserveHours >= 12 ? 'pm' : 'am';
        reserveHours = reserveHours % 12;
        reserveHours = reserveHours ? reserveHours : 12;
        reserveMinutes = reserveMinutes < 10 ? '0'+reserveMinutes : reserveMinutes;
        return reserveDay + " de " + months[reserveMonth] + " de " + reserveYear+" - "+reserveHours + ':' + reserveMinutes + ' ' + reserve_AM_PM;
    };
});