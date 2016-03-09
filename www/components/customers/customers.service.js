(function () {
    "use strict";

    angular
        .module('app.customers.service', [])
        .factory('CustomersService', CustomersService);

    /* @ngInject */
    function CustomersService($http, AppConfig) {

        return {
          getAll: getAll,
          getByID: getByID
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
    }
})();
