(function () {
    "use strict";

    angular
        .module('app.categories.service', [])
        .factory('CategoriesService', CategoriesService);

    /* @ngInject */
    function CategoriesService($http, AppConfig) {

        return {
          getAll: getAll,
          getByID: getByID
        }

        function getAll() {
          return $http.get(AppConfig.BASE_API_URL + '/categories').then(function(data) {
            return data.data.data;
          })
        }

        function getByID(id) {
          return $http.get(AppConfig.BASE_API_URL + '/categories/' + id).then(function(data) {
            return data.data.data;
          });
        }
    }
})();
