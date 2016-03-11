(function () {
    "use strict";
    angular
        .module('app.assignations.controller', [])
        .controller('AssignationsCtrl', AssignationsCtrl)
        .controller('AssignationsDetailCtrl', AssignationsDetailCtrl)
        .controller('AssignationsCreateCtrl', AssignationsCreateCtrl)
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
