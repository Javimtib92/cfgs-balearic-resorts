(function () {
    "use strict";

    angular
        .module('app.reservations.service', [])
        .factory('ReservationsService', ReservationsService);

    /* @ngInject */
    function ReservationsService($http, AppConfig) {

        return {
          getAll: getAll,
          getByID: getByID
        }

        function getAll() {
          return $http.get(AppConfig.BASE_API_URL + '/reservations').then(function(data) {
            return data.data.data;
          })
        }

        function getByID(id) {
          return $http.get(AppConfig.BASE_API_URL + '/reservations/' + id);
        }
    }
})();
