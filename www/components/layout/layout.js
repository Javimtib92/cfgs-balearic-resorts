(function() {
    "use strict";

    angular.module('app.layout', [])
    .run(['routerHelper', function (routerHelper) {
            routerHelper.configureStates(getStates());
        }])
    .controller('LayoutController', LayoutController);

    function LayoutController(LoginService) {
      var vm = this;
      vm.logout = function() {
        console.log("hola");
        LoginService.logout();
      }
    }

    function getStates() {
        return [
            {
                state: 'app',
                config: {
                    url: '/app',
                    templateUrl: 'layout/layout.html',
                    controller: 'LayoutController as vm',
                    abstract: false
                }
            }
        ]
    }
})();
