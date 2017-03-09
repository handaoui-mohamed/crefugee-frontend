(function () {
    'use strict';

    angular
        .module('app.auth',['satellizer'])
        .config(config);

    function config($stateProvider, $authProvider, $translatePartialLoaderProvider) {
        $authProvider.loginUrl = 'http://localhost:5000/api/login';
        $authProvider.tokenPrefix = '';
        $authProvider.authHeader = 'Authorization';
        $authProvider.authToken = '';

        $stateProvider.state('auth', {
            url: '/auth',
            controller: 'AuthController as vm',
            templateUrl: 'app/auth/auth.html'
        });

        $translatePartialLoaderProvider.addPart('app/auth');
    }
})();