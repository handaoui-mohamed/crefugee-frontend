(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ngResource',
            'ngTouch',
            'ngMessages',
            'ngAria',
            'pascalprecht.translate',
            'toastr',

            /* app module*/
            'app.main',
            'app.contact',
            'app.auth',
            'main.profile',
            'main.search',
            'app.userprofile',
            "main.home"
        ]);
})();