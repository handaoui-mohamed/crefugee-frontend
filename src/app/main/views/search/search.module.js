(function() {
    'use strict';

    angular
        .module('main.search', [])
        .config(config);

    function config($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider.state('main.search', {
            url: 'search',
            controller: 'SearchController as vm',
            templateUrl: 'app/main/views/search/search.html'
        });

        $translatePartialLoaderProvider.addPart('app/main/views/search');
    }
})();