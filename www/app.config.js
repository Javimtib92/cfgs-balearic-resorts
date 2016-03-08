(function () {
    'use strict';

    angular.module('app.config', [])
        .constant('AppConfig', {
            "BASE_API_URL": 'http://localhost/balearic-resorts.server/public'
        });
})();
