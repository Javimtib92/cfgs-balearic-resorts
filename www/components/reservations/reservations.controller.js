(function () {
    "use strict";
    angular
        .module('app.reservations.controller', [])
        .controller('ReservationsCtrl', ReservationsCtrl)
        .controller('ReservationsDetailCtrl', ReservationsDetailCtrl)
        .run(['routerHelper', function (routerHelper) {
            routerHelper.configureStates(getStates());
        }]);

    /* @ngInject */
    function ReservationsCtrl(reservations, AssignationsService, ReservationsService, $log) {
        var vm = this;
        vm.reservations = reservations;
        vm.showAssignView = AssignationsService.showAssignView;
        vm.unAssign = ReservationsService.unAssign;
        vm.remove = remove;

        function remove(reservation) {
          ReservationsService.destroy(reservation.id)
            .then(
              function(success) {
                $log.log(success);
                $log.log("vm.reservations", vm.reservations);
                var index = getIndexByPropertyValueInArrayOfObjects(vm.reservations, 'id', reservation.id);
                vm.reservations.splice(index, 1);
                $log.log("vm.reservations", vm.reservations);
              },
              function(error) {
                $log.log(error);
              }
            )
            .finally(function() {
              $log.log("finally");
            })
        }

        function getIndexByPropertyValueInArrayOfObjects(arr, property, value) {
          var i = 0;
          for (; i < arr.length; i++) {
            if (arr[i][property] == value) return i;
          }
        }
    }

    /* @ngInject */
    function ReservationsDetailCtrl(reservation, AssignationsService, ReservationsService, $log) {
        var vm = this;
        vm.reservation = reservation;
        vm.showAssignView = AssignationsService.showAssignView;
        vm.unAssign = ReservationsService.unAssign;
        vm.remove = remove;

        function remove(reservation) {
          ReservationsService.destroy(reservation.id)
            .then(
              function(success) {
                $log.log(success);
                $log.log("vm.reservations", vm.reservations);
                var index = getIndexByPropertyValueInArrayOfObjects(vm.reservations, 'id', reservation.id);
                vm.reservations.splice(index, 1);
                $log.log("vm.reservations", vm.reservations);
              },
              function(error) {
                $log.log(error);
              }
            )
            .finally(function() {
              $log.log("finally");
            })
          }

          function getIndexByPropertyValueInArrayOfObjects(arr, property, value) {
            var i = 0;
            for (; i < arr.length; i++) {
              if (arr[i][property] == value) return i;
            }
          }
    }

    function getStates() {
        return [
            {
                state: 'app.reservations',
                config: {
                    url: '/reservations',
                    templateUrl: 'reservations/index.html',
                    controller: 'ReservationsCtrl as vm',
                    resolve: {
                      reservations: ['ReservationsService', function(ReservationsService) {
                        return ReservationsService.getAll();
                      }]
                    }
                }
            },
            {
                state: 'app.reservation_detail',
                config: {
                    url: '/reservations/:id',
                    templateUrl: 'reservations/detail.html',
                    controller: 'ReservationsDetailCtrl as vm',
                    resolve: {
                      reservation: ['ReservationsService', '$stateParams', function(ReservationsService, $stateParams) {
                        return ReservationsService.getByID($stateParams.id);
                      }]
                    }
                }
            }
        ];
    }
})();
