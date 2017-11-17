
angular.module('adminModule')
    .controller('dashboardCtrl', function($scope,$location,MessageResource) {
        /* config object */
        checkUserType($location.absUrl());
        var user = JSON.parse( localStorage.getItem('session.owner') );
        $scope.message={
            headquarter :user.headquarter,
            owner : user.username
        };
        $scope.getMessages=function () {
            MessageResource.getMessages(function (res) {
                console.log("res ", res);
                $scope.messages=res;
                for (i = 0; i < $scope.messages.length; i++) {
                    $scope.messages[i].publish = $scope.setFormatDateTime($scope.messages[i].publish);
                }
            });
        };
        $scope.getMessages();

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

        var myVar = "";
        var d = 0;
        var messageID = "";

        $scope.mouseDown = function(obj) {
            messageID = obj;
            console.log(messageID);
            d = 0;
            myVar = setInterval(myTimer ,1000);
        };

        $scope.mouseUp = function(obj){
            clearInterval(myVar);
        };

        function myTimer() {
            d = d + 1;
            console.log(d);
            if (d==1){
                $scope.deleteMessages(messageID);
                clearInterval(myVar);
            }
        }

        $scope.validateMessage=function () {
            if($scope.message.title == null || $scope.message.title == ""){
                //alert("Error, campo titulo");
                return false;
            }
            if($scope.message.body == null || $scope.message.body == ""){
                //alert("Error, campo mensaje");
                return false;
            }
            return true;
        };

        $scope.resetFields=function () {
            $scope.message.title = "";
            $scope.message.body = "";
            document.getElementById("titleMessage").value = "";
            document.getElementById("bodyMessage").value = "";
        };

        $scope.postMessage=function() {
            if($scope.validateMessage()){
                console.log("envio",$scope.message);
                MessageResource.setMessage($scope.message);
                swal({
                    title: "Enviado",
                    text: "El mensaje ha sido enviado exitosamente",
                    type: "success",
                    confirmButtonColor: "#140e39",
                    timer: 1000,
                    showConfirmButton: false
                });
                $scope.resetFields();
                setTimeout(function(){ $scope.getMessages(); }, 1000);
            }else{
                $scope.resetFields();
                swal({
                    title: "Campos vacios!",
                    text: "El menseja no puede ir en blanco",
                    timer:2000,
                    type: "error",
                    showConfirmButton: false
                });
            }

        };

        $scope.deleteMessages=function(id){
            swal({
                title: "¿Esta seguro que desea eliminar este mensaje?",
                text: "Esta acción no podrá revertirse.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false
            }, function () {
                MessageResource.delMessage(id);
                swal({
                    title: "Eliminado",
                    text: "El mensaje ha sido eliminado exitosamente.",
                    type: "success",
                    confirmButtonColor: "#140e39",
                    timer: 1000,
                    showConfirmButton: false
                });
                setTimeout(function(){ $scope.getMessages(); }, 1000);
            });
        };
    });