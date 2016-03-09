(function () {
    "use strict";

    angular
        .module('app.login.service', [])
        .service('LoginService', LoginService);

    /* @ngInject */
    function LoginService($auth, $state, $http, AppConfig, $rootScope) {

        function login(credentials) {
          // Use Satellizer's $auth service to login
          $auth.login(credentials).then(
            function(data) {

                // Return an $http request for the now authenticated
                // user so that we can flatten the promise chain
                return $http.get(AppConfig.BASE_API_URL + '/api/authenticate/user');
            },
            function(error) {
                vm.loginError = true;
                vm.loginErrorText = error.data.error;

            // Because we returned the $http.get request in the $auth.login
            // promise, we can chain the next promise to the end here
            }
          ).then(function(response) {
                // Stringify the returned data to prepare it
                // to go into local storage
                var user = JSON.stringify(response.data.user);

                // Set the stringified user data into local storage
                localStorage.setItem('user', user);

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app
                $rootScope.currentUser = response.data.user;

                // Everything worked out so we can now redirect to
                // the users state to view the data
                $state.go('app');
          })
        }

        function logout() {
          $auth.logout().then(function() {
              // Remove the authenticated user from local storage
              localStorage.removeItem('user');

              // Flip authenticated to false so that we no longer
              // show UI elements dependant on the user being logged in
              $rootScope.authenticated = false;

              // Remove the current user info from rootscope
              $rootScope.currentUser = null;
          });
        }

        return {
            login: login,
            logout: logout
        }
    }
})();
