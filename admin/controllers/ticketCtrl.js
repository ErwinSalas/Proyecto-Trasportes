angular.module('adminModule')
    .controller('ticketCtrl', function($scope,$location,$routeParams,ReserveResources,FleetCarResources,DriverResources) {
        checkUserType($location.absUrl().split("/")[4]);
        /* config object */

        $scope.valueID = $routeParams.valueID;
        $scope.membersListTicket = [];
        $scope.reserveDate = "";
        $scope.assignedDriverT = " ";
        $scope.assignedDriverF = " ";
        $scope.driverLicense = " ";
        $scope.driverName = " ";
        $scope.reservedDepartureDate = "";
        $scope.reservedDepartureTime = "";
        $scope.reservedArrivalDate = "";
        $scope.reservedArrivalTime = "";

        console.log(reserveSelectedID);
        $scope.getReserve = ReserveResources.getReserve(reserveSelectedID, function (res) {
            $scope.reserve=res;
            console.log("EL TICKET resInfo ", $scope.reserve);

            $scope.getCarInfo = FleetCarResources.getCarInfo($scope.reserve.vehicleId, function (res) {
                $scope.carInfo=res;
                console.log("Fleet resInfo ", $scope.carInfo);
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
            }
            for (i = 0; i < $scope.reserve.members.length; i++) {
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
            $scope.reserveDate =  $scope.setFormatDate($scope.reserve.requestDateTime);
            $scope.reservedDepartureDate = $scope.setFormatDate($scope.reserve.departure);
            $scope.reservedDepartureTime = $scope.setFormatTime($scope.reserve.departure);
            $scope.reservedArrivalDate = $scope.setFormatDate($scope.reserve.arrival);
            $scope.reservedArrivalTime = $scope.setFormatTime($scope.reserve.arrival);
            console.log($scope.membersListTicket)
        });

        $scope.setFormatDate = function (date) {
            reserveDate = new Date(date);
            reserveYear = reserveDate.getFullYear();
            reserveMonth = reserveDate.getMonth();
            reserveDay = reserveDate.getDate();
            return reserveDay + "/" + reserveMonth + "/" + reserveYear;
        };

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

        $scope.goBackTicket = function() {
            window.location.href = '#/admin/reserves/info/'+reserveSelectedID;
        };

        $scope.printElem = function(divName) {

            /*var contents = document.getElementById(divName).innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.display = "none";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : (frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument);
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>Ticket</title>');
            frameDoc.document.write('<link href="../assets/css/estilo.css" rel="stylesheet" media="print">');
            frameDoc.document.write('<link href="../assets/css/style.css" rel="stylesheet" media="print">');
            frameDoc.document.write('<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" media="print">');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;*/
            var headstr = "<html><head><title></title></head><body>";
            var footstr = "</body>";
            var newstr = document.all.item(divName).innerHTML;
            var oldstr = document.body.innerHTML;
            document.body.innerHTML = headstr+newstr+footstr;
            window.print();
            document.body.innerHTML = oldstr;

            location.reload();
            //window.location.href = '#/admin/reserves/ticket/'+reserveSelectedID;

        }

    })
.directive('printDiv', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function(evt){
                evt.preventDefault();
                PrintElem(attrs.printDiv);
            });

            function PrintElem(elem)
            {
                PrintWithIframe($(elem).html());
            }

            function PrintWithIframe(data)
            {   
                if ($('iframe#printf').size() == 0) {
                    $('html').append('<iframe id="printf" name="printf"></iframe>');  // an iFrame is added to the html content, then your div's contents are added to it and the iFrame's content is printed

                    var mywindow = window.frames["printf"];
                    mywindow.document.write('<html><head><title></title><style>@page {margin: 25mm 0mm 25mm 5mm}</style>'  // Your styles here, I needed the margins set up like this
                        + '</head><body><div>'
                        + data
                        + '</div></body></html>');

                    $(mywindow.document).ready(function(){
                        mywindow.print();
                        setTimeout(function(){
                                $('iframe#printf').remove();
                            },
                            2000);  // The iFrame is removed 2 seconds after print() is executed, which is enough for me, but you can play around with the value
                    });
                }

                return true;
            }
        }
    };
});