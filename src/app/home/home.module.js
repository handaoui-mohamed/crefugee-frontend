(function() {
    'use strict';

    angular
        .module('main.home', [])
        .config(config);

    function config($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider.state('main.home', {
            url: 'home',
            controller: 'HomeController as vmHome',
            templateUrl: 'app/home/home.html'
        });

        $translatePartialLoaderProvider.addPart('app/home');
    }
})();