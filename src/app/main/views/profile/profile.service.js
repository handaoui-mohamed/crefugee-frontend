(function() {
    'use strict';

    angular
        .module('main.profile')
        .factory('ProfileService', ProfileService);

    function ProfileService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + 'profile', {}, {
            'get': {
                method: 'GET',
                isArray: false
            },
            'update': {
                method: 'PUT'
            }
        });
    }
})();