(function () {
    "use strict";
    angular
        .module('app.reservations.controller', [])
        .controller('ReservationsCtrl', ReservationsCtrl)
        .run(['routerHelper', function (routerHelper) {
            routerHelper.configureStates(getStates());
        }]);

    /* @ngInject */
    function ReservationsCtrl(reservations) {
        var vm = this;
        vm.reservations = reservations;
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
            }
        ];
    }
})();
