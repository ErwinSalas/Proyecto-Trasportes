angular.module('userModule')
    .controller('ticketCtrl', function($scope,$location,$routeParams,$compile,ReserveResource,FleetCarResource,DriverResources) {
        checkUserType($location.absUrl());
        /* config object */

        $scope.valueID = $routeParams.valueID;
        $scope.todayDate = new Date();
        $scope.todayDate = $scope.todayDate.getDate() + "/" + ($scope.todayDate.getMonth()+1) + "/" + $scope.todayDate.getFullYear();
        $scope.membersListTicket = [];
        $scope.membersListTicket2 = [];
        $scope.reserveDate = "";
        $scope.assignedDriverT = " ";
        $scope.assignedDriverF = " ";
        $scope.driverLicense = " ";
        $scope.driverName = " ";
        $scope.reservedDepartureDate = "";
        $scope.reservedDepartureTime = "";
        $scope.reservedArrivalDate = "";
        $scope.reservedArrivalTime = "";
        /*
        * Función que obtiene toda la informacion que se va a mostrar en la información de la boleta
        */
        $scope.getReserve = ReserveResource.getReserve(reserveSelectedID, function (res) {
            $scope.reserve=res;
            $scope.getCarInfo = FleetCarResource.getCarInfo($scope.reserve.vehicleId, function (res) {
                $scope.carInfo=res;
            });
            if($scope.reserve.requestDriver == true){
                $scope.getDriverInfo = DriverResources.getDriverInfo($scope.reserve.assignedDriver, function (res) {
                    $scope.driverInfo=res;
                    console.log("Driver resInfo ", $scope.driverInfo);
                    $scope.assignedDriverT = "X";
                    $scope.driverLicense = $scope.driverInfo.identification;
                    $scope.driverName = $scope.driverInfo.firstName + " " + $scope.driverInfo.lastName;
                });
            }else {
                $scope.assignedDriverF = "X";
                $scope.driverLicense = $scope.reserve.members[0].identification;
                $scope.driverName = $scope.reserve.members[0].firstName + " " + $scope.reserve.members[0].lastName;
            }
            for (i = 0; i < $scope.reserve.members.length; i++) {
                $scope.reserve.members[i].departureTime = $scope.setFormatTimeMembers($scope.reserve.members[i].departureTime )
                $scope.reserve.members[i].returnTime = $scope.setFormatTimeMembers($scope.reserve.members[i].returnTime)
                $scope.membersListTicket.push($scope.reserve.members[i])
            }
            if($scope.reserve.activityType == "Administrative"){
                $scope.reserve.activityType = "Administrativa";
            }
            if($scope.reserve.activityType == "Academic"){
                $scope.reserve.activityType = "Academica";
            }
            if($scope.reserve.activityType == "Generic"){
                $scope.reserve.activityType = "Generica";
            }
            if($scope.reserve.members.length > 4){
                for (i = 4; i < $scope.membersListTicket.length; i++) {
                    $scope.membersListTicket2.push($scope.membersListTicket[i])
                }
                document.getElementById("ticketBtnTwo").innerHTML = "<button type='button\' class='btn bg-indigo btn-circle-lg waves-effect waves-circle waves-float' data-toggle='modal' data-target='#defaultModal' style='position: fixed; bottom:11%; right: 2%'><i class='material-icons'>library_books</i></button>";
                $compile(document.getElementById("ticketBtnTwo") )($scope);
            }
            $scope.reserveDate =  $scope.setFormatDate($scope.reserve.requestDateTime);
            $scope.reservedDepartureDate = $scope.setFormatDate($scope.reserve.departure);
            $scope.reservedDepartureTime = $scope.setFormatTime($scope.reserve.departure);
            $scope.reservedArrivalDate = $scope.setFormatDate($scope.reserve.arrival);
            $scope.reservedArrivalTime = $scope.setFormatTime($scope.reserve.arrival);
            console.log($scope.membersListTicket)
            document.getElementById("printBtnB").innerHTML = "<button type='button\' class='btn bg-red btn-circle-lg waves-effect waves-circle waves-float' style='position: fixed; bottom:2%; right: 2%' ng-click='printElem()'><i class='material-icons'>print</i></button>";
            $compile(document.getElementById("printBtnB") )($scope);
        });
        /*
        * Función que da formato de fecha
        */
        $scope.setFormatDate = function (date) {
            reserveDate = new Date(date);
            reserveYear = reserveDate.getFullYear();
            reserveMonth = reserveDate.getMonth();
            reserveDay = reserveDate.getDate();
            return reserveDay + "/" + (reserveMonth + 1) + "/" + reserveYear;
        };
        /*
        * Función que da formato a la hora
         */
        $scope.setFormatTime = function (date) {
            reserveDate = new Date(date);
            reserveHours = reserveDate.getHours();
            reserveMinutes = reserveDate.getMinutes();
            reserve_AM_PM = reserveHours >= 12 ? 'pm' : 'am';
            reserveHours = reserveHours % 12;
            reserveHours = reserveHours ? reserveHours : 12;
            reserveMinutes = reserveMinutes < 10 ? '0'+reserveMinutes : reserveMinutes;
            return reserveHours + ':' + reserveMinutes + ' ' + reserve_AM_PM;
        };
        /*
        * Función que da formato en el script
         */
        $scope.setFormatTimeMembers = function (date) {
            var timeString = date;
            var H = +timeString.substr(0, 2);
            var h = H % 12 || 12;
            var ampm = (H < 12 || H === 24) ? " am" : " pm";
            return timeString = h + timeString.substr(2, 3) + ampm;
        };
        //Devolver de la vista
        $scope.goBackTicket = function() {
            window.location.href = '#/user/reserves/info/'+reserveSelectedID;
        };
        /*
        * Función que imprime la boleta
        */
        $scope.printElem = function() {
            var contents = document.getElementById('ticketBody').innerHTML;
            var contents2;
            if ($scope.membersListTicket2.length > 0){
                contents2 = document.getElementById('ticketBody2').innerHTML;
            }
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : (frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument);
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>Ticket</title>');
            frameDoc.document.write('<link rel="stylesheet" href="../bower_components/fullcalendar/dist/fullcalendar.css"/>' +
                ' <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">' +
                ' <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">' +
                ' <link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">' +
                ' <link href="../plugins/node-waves/waves.css" rel="stylesheet" />' +
                ' <link href="../plugins/animate-css/animate.css" rel="stylesheet" />' +
                ' <link href="../bower_components/sweetalert/dist/sweetalert.css" rel=" stylesheet" />' +
                ' <link href="../plugins/material-design-preloader/md-preloader.css" rel="stylesheet" />' +
                ' <link href="../assets/css/style.css" rel="stylesheet">' +
                ' <link href="../assets/css/estilo.css" rel="stylesheet">' +
                ' <link rel="stylesheet" href="../assets/css/mediaQueries.css"');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            if ($scope.membersListTicket2.length > 0){
                frameDoc.document.write(contents2);
            }
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
        }
    })