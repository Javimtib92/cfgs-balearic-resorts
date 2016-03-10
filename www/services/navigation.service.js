(function () {
    "use strict";

    angular
        .module('app.navigation.service', [])
        .factory('NavigationService', NavigationService);

    /* @ngInject */
    function NavigationService($state, $log) {
        // Initialize navigation stack with the root route
        var _navigationStack = ['app.reservations'];

        return {
          put: put,
          pop: pop,
          first: first,
          last: last,
          isEmpty: isEmpty,
          goBack: goBack,
          info: info,
          loadPreviousStack: loadPreviousStack
        }

        /**
        * Push a route to the navigation stack
        */
        function put(route) {
          _navigationStack.push(route);
          window.localStorage.setItem('navigationStack', _navigationStack);
        }

        /**
        * Remove a route from the navigation stack
        */
        function pop() {
          _navigationStack.pop();
        }

        /**
        * Get first element of the navigation stack
        */
        function first() {
          return _navigationStack[0];
        }

        /**
        * Get last element of the navigation stack
        */
        function last() {
          return _navigationStack[_navigationStack.length - 1];
        }

        /**
        * Checks if the navigation stack is empty
        */
        function isEmpty () {
            return _navigationStack.length === 0;
        }

        /**
        * Goes back to the previous state of the navigation stack
        */
        function goBack() {
          pop();

          if(typeof last() === 'undefined') {
            return;
          }
          var previousView = last();
          $state.go(previousView);
        }

        /**
        * Prints the navigation stack info on the console
        */
        function info() {
            $log.log(_navigationStack);
        }

        /**
        * We check for a stack saved on localstorage and if exists we store it in the cache navigation stack
        * The purpose of this method is to call it when we run the app, so if we refresh the screen we keep
        * track of the navigation stack
        **/
        function loadPreviousStack() {
          var storedNavigationStack = window.localStorage.getItem('navigationStack');

          if(storedNavigationStack !== null)
            _navigationStack = storedNavigationStack.split(',');
        }
    }
})();
