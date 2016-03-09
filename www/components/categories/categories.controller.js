(function () {
    "use strict";
    angular
        .module('app.categories.controller', [])
        .controller('CategoriesCtrl', CategoriesCtrl)
        .controller('CategoriesDetailCtrl', CategoriesDetailCtrl)
        .run(['routerHelper', function (routerHelper) {
            routerHelper.configureStates(getStates());
        }]);

    /* @ngInject */
    function CategoriesCtrl(categories) {
        var vm = this;
        vm.categories = categories;
    }

    /* @ngInject */
    function CategoriesDetailCtrl(category) {
        var vm = this;
        vm.category = category;
    }

    function getStates() {
        return [
            {
                state: 'app.categories',
                config: {
                    url: '/categories',
                    templateUrl: 'categories/index.html',
                    controller: 'CategoriesCtrl as vm',
                    resolve: {
                      categories: ['CategoriesService', function(CategoriesService) {
                        return CategoriesService.getAll();
                      }]
                    }
                }
            },
            {
                state: 'app.category_detail',
                config: {
                    url: '/categories/:id',
                    templateUrl: 'categories/detail.html',
                    controller: 'CategoriesDetailCtrl as vm',
                    resolve: {
                      category: ['CategoriesService', '$stateParams', function(CategoriesService, $stateParams) {
                        return CategoriesService.getByID($stateParams.id);
                      }]
                    }
                }
            }
        ];
    }
})();
