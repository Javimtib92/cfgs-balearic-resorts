(function() {
    "use strict";

    angular.module('app.layout', [])
    .run(['routerHelper', function (routerHelper) {
            routerHelper.configureStates(getStates());
        }])
    .controller('LayoutController', LayoutController);

    function LayoutController(LoginService, $state) {
      var vm = this;
      vm.navigationLinks = [
        {title: 'Reservations', icon: 'fa-hotel', uiSref: 'app.reservations', activeStates: ['app.reservations', 'app.reservation_detail']},
        {title: 'Customers', icon: 'fa-user', uiSref: 'app.customers', activeStates: ['app.customers', 'app.customer_detail']},
        {title: 'Categories', icon: 'fa-list', uiSref: 'app.categories', activeStates: ['app.categories', 'app.category_detail']},
        {title: 'Hotels', icon: 'fa-h-square', uiSref: 'app.hotels', activeStates: ['app.hotels', 'app.hotel_detail']}
      ];

      vm.setActiveLink = function(activeStates) {
        if(Array.isArray(activeStates)) {
          var i = 0;
          for(; i < activeStates.length; i++) {
            if(activeStates[i] === $state.current.name) {
              return "active";
            }
          }
        } else {
          if(activeStates === $state.current.name) {
            return "active";
          }
        }
      }

      vm.logout = function() {
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
                    abstract: true
                }
            }
        ]
    }
})();
