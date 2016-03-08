(function() {
    "use strict";

    angular.module('app',[
        'ui.router',
        'app.routeHelper',
        'templates',
        'app.config',
        'app.auth',

        'app.layout',
        'app.login'
    ])
        .config(appConfig)
        .run(appRun);

    /* @ngInject */
    function appConfig($httpProvider) {
           $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
    };

    /* @ngInject */
    function appRun($rootScope, $state, AppAuth) {
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !AppAuth.isAuthenticated()){
          // User isn’t authenticated
          $state.transitionTo("login");
          event.preventDefault();
        }
      });
    };
})();
