(function() {
    'use strict';

    angular
        .module('main.home', [])
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('main.home', {
            url: '',
            controller: 'HomeController as vmHome',
            templateUrl: 'app/home/home.html'
        });
    }
})();