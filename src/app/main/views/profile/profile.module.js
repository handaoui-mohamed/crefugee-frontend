(function() {
    'use strict';

    angular
        .module('main.profile', ['ngFileUpload'])
        .config(config);

    function config($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider.state('main.profile', {
            url: 'profile',
            controller: 'ProfileController as vm',
            templateUrl: 'app/main/views/profile/profile.html',
            loginRequired: true
        });

        $translatePartialLoaderProvider.addPart('app/main/views/profile');
    }
})();