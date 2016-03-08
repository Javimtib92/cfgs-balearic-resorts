(function () {
    "use strict";
    angular
        .module('app.login.controller', [])
        .controller('LoginCtrl', LoginCtrl)
        .run(['routerHelper', function (routerHelper) {
            routerHelper.configureStates(getStates());
        }]);

    /* @ngInject */
    function LoginCtrl($scope, LoginService, $state) {
        var vm = this;
        vm.user = {email: null, password: null};

        vm.login = login;

        function login() {
            LoginService.login(vm.user);
        }

        $scope.$on('event:auth-login-confirmed', function (e, userData) {
            console.log("User", vm.user);
            window.localStorage.setItem('auth_token', "sdfkjf");
            $state.go('app');
        });

        $scope.$on('event:auth-login-failed', function (e, status) {
            console.log("Failed", status);
        });
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'login/login.html',
                    controller: 'LoginCtrl as vm'
                }
            }
        ];
    }
})();
