(function() {
    'use strict';

    angular
        .module('main.search', [])
        .config(config);

    function config($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider.state('main.search', {
            url: 'search/:type',
            controller: 'SearchController as vmSr',
            templateUrl: 'app/search/search.html'
        });

        $translatePartialLoaderProvider.addPart('app/search');
    }
})();