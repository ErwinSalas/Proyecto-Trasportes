/**
 * Created by Erwin on 29/10/2016.
 */
angular.module('userModule')
    .controller('reservationsCreateCtrl', function($scope,GetAvailableFleetResource,ReserveResource) {
        $scope.setDates=function(arrival,departure){
            $scope.reservation={
                arrival :arrival,
                departure:departure
            };
        };
        $scope.postReservation=function() {
            var user = JSON.parse( localStorage.getItem('session.owner') );
            $scope.reservation.requestingUser= user.username;
            console.log("envio",$scope.reservation)
            ReserveResource.setReserve($scope.reservation);

        };
        $scope.members = [];


        $scope.agregarPasajero = function(){
            $scope.usuariosD = {
                departureTime: datetimeToUrlParameter(departureDate, departureHour),
                returnTime: datetimeToUrlParameter(arrivalDate, arrivalHour)
            };
            scope.members.push();
            console.log(scope.usuariosD);
        }
        

        document.getElementById("btnCheck").addEventListener("click", function(){
            var arrivalDate= document.getElementById("arrivalDate").value;
            var arrivalHour= document.getElementById("arrivalHour").value;
            var departureDate= document.getElementById("departureDate").value;
            var departureHour= document.getElementById("departureHour").value;
            var urlParams = {
                start: datetimeToUrlParameter(departureDate,departureHour),
                end : datetimeToUrlParameter(arrivalDate,arrivalHour)

            };
           if(new Date(departureDate)>= new Date()) {
                if (arrivalDate != null && arrivalHour != null && departureDate != null && departureHour != null){
                    $scope.getFleet = GetAvailableFleetResource.response(urlParams, function (res) {
                        console.log("res ", res);
                        $scope.fleets = res

                    });
                    $scope.setDates(datetimeToISO8601(arrivalDate,arrivalHour),datetimeToISO8601(departureDate,departureHour)) ;
                }
                swal({
                    title: "Comprobación Exitosa",
                    type: "success",
                    confirmButtonColor: "#140e39",
                    timer: 1000,
                    showConfirmButton: false



                });
            }
            else{

                sweetAlert("Error...", "No existen autos dispoonibles en la fecha solicitada", "error");
            }


        }

    );



});