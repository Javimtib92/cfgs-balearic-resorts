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
    function ReservationsCtrl(reservations) {
        var vm = this;
        vm.reservations = reservations;
    }

    /* @ngInject */
    function ReservationsDetailCtrl(reservation) {
        var vm = this;
        console.log(reservation);
        vm.reservation = reservation;
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
