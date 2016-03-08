(function () {
    "use strict";

    angular.module('app.auth', [])
        .factory('AppAuth', AppAuth)
        .config(configHttpProvider);

    /* @ngInject */
    function AppAuth($rootScope) {

        function loginConfirmed(token, userData) {
            setAuthData(token, userData.id);
            $rootScope.$broadcast('event:auth-login-confirmed', userData);
        }

        /**
         * Call this function to indicate that authentication was unsuccessful
         * @param data
         */
        function loginFailed(data) {
            $rootScope.$broadcast('event:auth-login-failed', data);
        }

        /**
         * Logout user
         */
        function logout() {
            destroyUserCredentials();
            $rootScope.$broadcast('event:auth-logout');
        }

        /**
         * Add authorization header
         * @param headers
         * @returns {*}
         */
        function addAuthHeader(headers) {
            var authToken = getAuthToken();
            if (authToken) {
                headers.Authorization = 'Bearer ' + authToken;
            }
            return headers;
        }

        /**
         * Return the auth token
         * @returns {*}
         */
        function getAuthToken() {
            return window.localStorage.getItem('auth_token');
        }

        /**
         * Store user auth data in localstorage
         * @param token
         * @param userId
         */
        function setAuthData(token, userId) {
            window.localStorage.setItem('auth_token', token);
            window.localStorage.setItem('currentUserId', userId);
        }

        /**
         * Return current user ID
         * @returns {*}
         */
        function getCurrentUserId() {
            return window.localStorage.getItem('currentUserId');
        }

        /**
         * Remove user data from localstorage
         */
        function destroyUserCredentials() {
            window.localStorage.removeItem('auth_token');
            window.localStorage.removeItem('currentUserId');
            window.localStorage.removeItem('profile');
            window.localStorage.removeItem('fbtoken');
        }

        function isAuthenticated() {
          if(window.localStorage.getItem('auth_token')) {
            return true;
          } else {
            return false;
          }
        }

        return {
            addAuthHeader: addAuthHeader,
            isAuthenticated: isAuthenticated,
            getAuthToken: getAuthToken,
            getCurrentUserId: getCurrentUserId,
            loginConfirmed: loginConfirmed,
            loginFailed: loginFailed,
            logout: logout
        };
    }

    /**
     * $http interceptor.
     * On 401 response (without 'ignoreAuthModule' option) stores the request
     * and broadcasts 'event:auth-loginRequired'.
     * On 403 response (without 'ignoreAuthModule' option) discards the request
     * and broadcasts 'event:auth-forbidden'.
     */
    /* @ngInject */
    function configHttpProvider($httpProvider) {
        $httpProvider.interceptors.push(['$rootScope', '$q', 'AppAuth', function ($rootScope, $q, AppAuth) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    var authToken = AppAuth.getAuthToken();
                    if (authToken) {
                        config.headers.Authorization = 'Bearer ' + authToken;
                    }
                    return config;
                },
                responseError: function (rejection) {
                    if (!rejection.config.ignoreAuthModule) {
                        switch (rejection.status) {
                            case 401:
                                $rootScope.$broadcast('event:auth-login-required', rejection);
                                break;
                            case 403:
                                $rootScope.$broadcast('event:auth-forbidden', rejection);
                                break;
                        }
                    }
                    // otherwise, default behaviour
                    return $q.reject(rejection);
                }
            };
        }]);
    }
})();
