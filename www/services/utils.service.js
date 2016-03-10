(function () {
    "use strict";

    angular
        .module('app.utils.service', [])
        .factory('UtilsService', UtilsService);

    /* @ngInject */
    function UtilsService() {
        return {
          getIndexByPropertyValueInArrayOfObjects: getIndexByPropertyValueInArrayOfObjects
        }

        function getIndexByPropertyValueInArrayOfObjects(arr, property, value) {
          var i = 0;
          for (; i < arr.length; i++) {
            if (arr[i][property] == value) return i;
          }
        }
    }
})();
