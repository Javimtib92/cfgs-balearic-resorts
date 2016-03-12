(function () {
    "use strict";
    angular
        .module('app.assignations.controller', [])
        .controller('AssignationsCtrl', AssignationsCtrl)
        .controller('AssignationsDetailCtrl', AssignationsDetailCtrl)
        .controller('AssignationsCreateCtrl', AssignationsCreateCtrl)
        .controller('CalendarCtrl', CalendarCtrl)
        .run(['routerHelper', function (routerHelper) {
            routerHelper.configureStates(getStates());
        }]);

    /* @ngInject */
    function AssignationsCtrl(assignations) {
        var vm = this;
        vm.assignations = assignations;
    }

    /* @ngInject */
    function AssignationsDetailCtrl(assignation) {
        var vm = this;
        vm.assignation = assignation;
    }

    /* @ngInject */
    function AssignationsCreateCtrl($scope, AssignationsService, $log, $state) {
        var vm = this;
        vm.choosedRoom = null;
        vm.assign = assign;

        /**
        * Load data when view finish loading
        **/
        $scope.$on('$viewContentLoaded', function(event){
          // Get reservation details for view display
          vm.reservation = AssignationsService.getReservationDetails();

          // Get list of rooms that we can assign the reservation to
          AssignationsService.getRoomsAvailableByReservationID(vm.reservation.id).then(function(data) {
            vm.availableRooms = data.data.data;
            $log.log("content loaded reserv", vm.availableRooms);
          })
        });

        function assign() {
          AssignationsService.assign(vm.choosedRoom).then(
            function(success) {
              $state.go('app.reservations');
            },
            function(error) {
              $log.log(error);
            }
          );
        }
    }

    function CalendarCtrl($http, AppConfig) {
      var vm = this;
      vm.options = {
        calendarView: 'week',
        calendarDate: moment(new Date()),
        calendarTitle: ''
      }

      vm.selectedDate = moment();
      vm.hotels = [
        {id: 1, name: 'Balearic Resorts Palma'},
        {id: 2, name: 'Balearic Resorts Arta'},
        {id: 3, name: 'Balearic Resorts Fornalutx'},
        {id: 4, name: 'Balearic Resorts Inca'},
        {id: 5, name: 'Balearic Resorts Manacor'},
        {id: 6, name: 'Balearic Resorts Campos'}
      ]

      vm.selected = {
        id:1,
        name: 'Balearic Resorts Palma'
      };
      //TODO pasarle fechas y hotel
      vm.loadData = function() {
        var copy = moment(vm.selectedDate);

        var start_date = copy.subtract(vm.selectedDate.day(), 'days').format('YYYY-MM-DD');
        var end_date = copy.add(7 - vm.selectedDate.day() - 1 + 7, 'days').format('YYYY-MM-DD');

        $http({
          'url': AppConfig.BASE_API_URL + '/assignements',
          'method': 'GET',
          'params': {
            'start_date': start_date,
            'end_date': end_date,
            'hotel_id': vm.selected.id
          }
        })
          .then(
            function(data) {
              console.log(data);
              var data = data.data.data;
              var result = [];

              var i = 0;
              for(; i < data.length; i++) {
                var object = {
                  title: 'Room number: ' + data[i].room_id, // The title of the event
                  type: 'info',
                  startsAt: data[i].start_date,
                  endsAt: data[i].end_date,
                  editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
                  deletable: false,
                }

                result.push(object);
              }

              vm.events = result;
            }
          )
      }

      vm.loadData();
    }

    function getStates() {
        return [
            {
                state: 'app.assignations',
                config: {
                    url: '/assignations',
                    templateUrl: 'assignations/hotel-selection.html',
                    controller: 'AssignationsCtrl as vm',
                    resolve: {
                      assignations: ['AssignationsService', function(AssignationsService) {
                        return AssignationsService.getAll();
                      }]
                    }
                }
            },
            {
                state: 'app.assignation_create',
                config: {
                  //TODO mirar por que la url me hace una petición al servidor
                    url: '/assignations/create',
                    templateUrl: 'assignations/create.html',
                    controller: 'AssignationsCreateCtrl as vm'
                }
            },
            {
                state: 'app.assignation_detail',
                config: {
                    url: '/assignations/:id',
                    templateUrl: 'assignations/detail.html',
                    controller: 'AssignationsDetailCtrl as vm',
                    resolve: {
                      assignation: ['AssignationsService', '$stateParams', function(AssignationsService, $stateParams) {
                        return AssignationsService.getByID($stateParams.id);
                      }]
                    }
                }
            }
        ];
    }
})();
