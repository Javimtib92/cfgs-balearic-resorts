(function () {
    "use strict";

    angular
        .module('app.customers.service', [])
        .factory('CustomersService', CustomersService);

    /* @ngInject */
    function CustomersService($http, $state, AppConfig) {

        return {
          getAll: getAll,
          getByID: getByID,
          update: update,
          destroy: destroy
        }

        function getAll() {
          return $http.get(AppConfig.BASE_API_URL + '/customers').then(function(data) {
            return data.data.data;
          })
        }

        function getByID(id) {
          return $http.get(AppConfig.BASE_API_URL + '/customers/' + id).then(function(data) {
            console.log(data);
            return data.data.data;
          });
        }

        function update(customer) {
          return $http.put(AppConfig.BASE_API_URL + '/customers/' + customer.id, customer).then(function(data) {
            $state.go('app.customers');
          });
        }

        function destroy(id) {
          return $http.delete(AppConfig.BASE_API_URL + '/customers/' + id);
        }
    }
})();
