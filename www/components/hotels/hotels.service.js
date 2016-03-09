(function () {
    "use strict";

    angular
        .module('app.hotels.service', [])
        .factory('HotelsService', HotelsService);

    /* @ngInject */
    function HotelsService($http, AppConfig) {

        return {
          getAll: getAll,
          getByID: getByID
        }

        function getAll() {
          return $http.get(AppConfig.BASE_API_URL + '/hotels').then(function(data) {
            return data.data.data;
          })
        }

        function getByID(id) {
          return $http.get(AppConfig.BASE_API_URL + '/hotels/' + id).then(function(data) {
            return data.data.data;
          });
        }
    }
})();
