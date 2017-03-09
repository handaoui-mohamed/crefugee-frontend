(function() {
    'use strict';

    angular
        .module('main.search')
        .factory('SearchService', SearchService);

    function SearchService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + "search/:page", { page: "@id" }, {
            'search': {
                method: 'POST',
                isArray: false
            }
        })
    }
})();