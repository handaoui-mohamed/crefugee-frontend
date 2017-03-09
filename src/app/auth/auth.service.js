(function () {
    'use strict';

    angular
        .module('app.auth')
        .factory('RegisterService', RegisterService);

    function RegisterService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + 'users');
    }

})();