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
    function CustomersCtrl(customers) {
        var vm = this;
        vm.customers = customers;
    }

    function CustomersDetailCtrl(customer) {
        var vm = this;
        vm.customer = customer;console.log(customer);
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
