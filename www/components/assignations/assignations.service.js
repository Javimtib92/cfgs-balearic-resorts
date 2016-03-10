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
          getRoomsAvailableByReservationID: getRoomsAvailableByReservationID,
          assign: assign,
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

        function getRoomsAvailableByReservationID(id) {
          return $http.get(AppConfig.BASE_API_URL +
             '/rooms/available/' + id +
              '?start_date=' + _reservationDetails.start_date + '&end_date=' + _reservationDetails.end_date);
        }

        function assign(room) {
          return $http.post(AppConfig.BASE_API_URL + '/assignements', {
            'reservation_id' : _reservationDetails.id,
            'room_id' : room,
            'price' : _reservationDetails.price,
            'start_date' : _reservationDetails.start_date,
            'end_date' : _reservationDetails.end_date,
          });
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
