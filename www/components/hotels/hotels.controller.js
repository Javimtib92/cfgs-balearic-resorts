(function () {
    "use strict";
    angular
        .module('app.hotels.controller', [])
        .controller('HotelsCtrl', HotelsCtrl)
        .controller('HotelsDetailCtrl', HotelsDetailCtrl)
        .run(['routerHelper', function (routerHelper) {
            routerHelper.configureStates(getStates());
        }]);

    /* @ngInject */
    function HotelsCtrl(hotels) {
        var vm = this;
        vm.hotels = hotels;
    }

    /* @ngInject */
    function HotelsDetailCtrl(hotel) {
        var vm = this;
        vm.hotel = hotel;
    }

    function getStates() {
        return [
            {
                state: 'app.hotels',
                config: {
                    url: '/hotels',
                    templateUrl: 'hotels/index.html',
                    controller: 'HotelsCtrl as vm',
                    resolve: {
                      hotels: ['HotelsService', function(HotelsService) {
                        return HotelsService.getAll();
                      }]
                    }
                }
            },
            {
                state: 'app.hotel_detail',
                config: {
                    url: '/hotels/:id',
                    templateUrl: 'hotels/detail.html',
                    controller: 'HotelsDetailCtrl as vm',
                    resolve: {
                      hotel: ['HotelsService', '$stateParams', function(HotelsService, $stateParams) {
                        return HotelsService.getByID($stateParams.id);
                      }]
                    }
                }
            }
        ];
    }
})();
