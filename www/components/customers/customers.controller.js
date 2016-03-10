(function () {
    "use strict";
    angular
        .module('app.customers.controller', [])
        .controller('CustomersCtrl', CustomersCtrl)
        .controller('CustomersDetailCtrl', CustomersDetailCtrl)
        .run(['routerHelper', function (routerHelper) {
            routerHelper.configureStates(getStates());
        }]);

    /* @ngInject */
    function CustomersCtrl(customers, CustomersService, UtilsService, $log) {
        var vm = this;
        vm.customers = customers;
        vm.remove = remove;

        function remove(customer) {
          CustomersService.destroy(customer.id)
            .then(
              function(success) {
                var index = UtilsService.getIndexByPropertyValueInArrayOfObjects(vm.customers, 'id', customer.id);
                vm.customers.splice(index, 1);
              },
              function(err) {
                $log.log(error);
              }
            )
        }
    }

    /* @ngInject */
    function CustomersDetailCtrl(customer, CustomersService, $state, $log) {
        var vm = this;
        vm.customer = customer;
        vm.remove = remove;

        function remove(customer) {
          CustomersService.destroy(customer.id)
            .then(
              function(success) {
                $state.go('app.customers');
              },
              function(err) {
                $log.log(err);
              }
            )
        }
    }

    function getStates() {
        return [
            {
                state: 'app.customers',
                config: {
                    url: '/customers',
                    templateUrl: 'customers/index.html',
                    controller: 'CustomersCtrl as vm',
                    resolve: {
                      customers: ['CustomersService', function(CustomersService) {
                        return CustomersService.getAll();
                      }]
                    }
                }
            },
            {
                state: 'app.customer_detail',
                config: {
                    url: '/customers/:id',
                    templateUrl: 'customers/detail.html',
                    controller: 'CustomersDetailCtrl as vm',
                    resolve: {
                      customer: ['CustomersService', '$stateParams', function(CustomersService, $stateParams) {
                        return CustomersService.getByID($stateParams.id);
                      }]
                    }
                }
            }
        ];
    }
})();
