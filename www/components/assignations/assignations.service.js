(function () {
    "use strict";

    angular
        .module('app.assignations.service', [])
        .factory('AssignationsService', AssignationsService);

    /* @ngInject */
    function AssignationsService($http, $state, AppConfig) {
        var _reservationDetails = null;

        return {
          getAll: getAll,
          getByID: getByID,
          store: store,
          showAssignView: showAssignView,
          getReservationDetails: getReservationDetails,
          setReservationDetails: setReservationDetails
        }

        function getAll() {
          return $http.get(AppConfig.BASE_API_URL + '/assignements').then(function(data) {
            return data.data.data;
          })
        }

        function getByID(id) {
          return $http.get(AppConfig.BASE_API_URL + '/assignements/' + id).then(function(data) {
            return data.data.data;
          });
        }

        function store() {

        }

        function showAssignView(reservationDetails) {
          _reservationDetails = reservationDetails;
          console.log("derails inside service", _reservationDetails);
          $state.go('app.assignation_create');
        }

        function getReservationDetails() {
          return _reservationDetails;
        }

        function setReservationDetails(data) {
          _reservationDetails = data;
        }
    }
})();
