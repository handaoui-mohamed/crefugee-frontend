(function() {
    'use strict';

    angular
        .module('app.userprofile', [])
        .config(config);

    function config($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider.state('main.userprofile', {
            url: 'profile/:username',
            controller: 'UserProfileController as vm',
            templateUrl: 'app/user-profile/user-profile.html'
        });


        $translatePartialLoaderProvider.addPart('app/user-profile');
    }
})();