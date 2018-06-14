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
        messagesDate = new Date(date);
        messagesYear = messagesDate.getFullYear();
        messagesMonth = messagesDate.getMonth();
        messagesDay = messagesDate.getDate();
        messagesHours = messagesDate.getHours();
        messagesMinutes = messagesDate.getMinutes();
        messages_AM_PM = messagesHours >= 12 ? 'pm' : 'am';
        messagesHours = messagesHours % 12;
        messagesHours = messagesHours ? messagesHours : 12;
        messagesMinutes = messagesMinutes < 10 ? '0'+messagesMinutes : messagesMinutes;
        return messagesDay + " de " + months[messagesMonth] + " de " + messagesYear+" - "+messagesHours + ':' + messagesMinutes + ' ' + messages_AM_PM;
    };
});