(function () {
    "use strict";

    angular
        .module('app.reservations.service', [])
        .factory('ReservationsService', ReservationsService);

    /* @ngInject */
    function ReservationsService($http, $log, AppConfig) {

        return {
          getAll: getAll,
          getByID: getByID,
          unAssign: unAssign
        }

        function getAll() {
          return $http.get(AppConfig.BASE_API_URL + '/reservations').then(function(data) {
            return data.data.data;
          })
        }

        function getByID(id) {
          return $http.get(AppConfig.BASE_API_URL + '/reservations/' + id).then(function(data) {
            return data.data.data;
          });
        }

        function unAssign(reservation) {
          return $http({
            'method': 'DELETE',
            'url': AppConfig.BASE_API_URL + '/reservations/' + reservation.id + '/unassign'
          }).then(
            function(data) {
              reservation.assigned = false;
            },
            function(error) {
              $log.log(error);
            }
          )
        }
    }
})();
