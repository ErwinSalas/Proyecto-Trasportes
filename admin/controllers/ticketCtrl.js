angular.module('adminModule')
    .controller('ticketCtrl', function($scope,$routeParams,ReserveResources) {
        /* config object */

        $scope.valueID = $routeParams.valueID;
        $scope.membersListTicket = [];

        console.log(reserveSelectedID);
        $scope.getReserve = ReserveResources.getReserve(reserveSelectedID, function (res) {
            $scope.reserve=res;
            console.log("EL TICKET resInfo ", $scope.reserve);
            if($scope.reserve.assignedDriver == null){
                $scope.reserve.assignedDriver = "X";
            }
            for (i = 0; i < $scope.reserve.length; i++) {
                $scope.membersListTicket.push($scope.reserve[i])
            }
        });

        $scope.printElem = function(divName) {

            var contents = document.getElementById(divName).innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.display = "none";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>DIV Contents</title>');
            frameDoc.document.write( '<link href="../assets/css/estilo.css" rel="stylesheet">');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;

        }

    });