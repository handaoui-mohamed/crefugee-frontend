(function() {
    'use strict';

    angular
        .module("app.main", [])
        .config(config);

    function config($translatePartialLoaderProvider) {
        $translatePartialLoaderProvider.addPart('app/main');
    }
})();