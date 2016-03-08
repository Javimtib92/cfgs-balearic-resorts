(function() {
    'use strict';

    angular
        .module('app.routeHelper', [])
        .provider('routerHelper', routerHelperProvider);

    /* @ngInject */
    function routerHelperProvider($stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        this.$get = RouterHelper;

        RouterHelper.$inject = ['$state'];
        /* @ngInject */
        function RouterHelper($state) {
            var hasOtherwise = false;

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function getStates() { return $state.get(); }

            return {
                configureStates: configureStates,
                getStates: getStates
            };
        }

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
    }
})();
