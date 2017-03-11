(function() {
    'use strict';

    angular
        .module('app', [
            'ngSanitize',
            'ui.router',
            'ngResource',
            'ngAnimate',
            'ngCookies',
            'ngTouch',
            'ngMessages',
            'ngAria',
            'ui.multiselect',
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