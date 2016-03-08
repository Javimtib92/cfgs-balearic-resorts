(function () {
    "use strict";

    angular
        .module('app.login.service', [])
        .service('LoginService', LoginService);

    /* @ngInject */
    function LoginService($http, AppAuth, AppConfig, $rootScope) {

        function login(user) {
            // $http.post(AppConfig.BASE_API_URL + '/users/login', user, {ignoreAuthModule: true})
            //     .success(function (data, status, headers, config) {
            //
            //         if (typeof data.error === 'undefined' && typeof data.auth_key !== 'undefined') {
            //             AppAuth.loginConfirmed(data.auth_key, data);
            //
            //         } else {
            //             AppAuth.loginFailed(data);
            //         }
            //     })
            //     .error(function (data, status, headers, config) {
            //         AppAuth.loginFailed(data);
            //     });
            $rootScope.$broadcast('event:auth-login-confirmed');
            console.log("hola");
        }

        return {
            login: login
        }
    }
})();
