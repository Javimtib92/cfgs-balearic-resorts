/**
 * @copyright Copyright (c) 2013-2015 2amigOS! Consulting Group LLC
 * @link http://2amigos.us
 * @license http://www.opensource.org/licenses/bsd-license.php New BSD License
 */

(function () {
    "use strict";
    angular
        .module('app.directives.tooltip', [])
        .directive('tooltip', tooltip);

    /* @ngInject */
    function tooltip() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, ctrl) {
              element.tooltip();
            }
        }
    }

})();
