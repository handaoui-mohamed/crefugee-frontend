(function() {
    'use strict';

    angular
        .module('main.search')
        .factory('HelperPostService', HelperPostService)
        .factory('RefugeePostService', RefugeePostService)
        .factory('PostService',PostService);

    function HelperPostService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + "post/helper/:page", { page: "@id" }, {
            'get': {
                method: 'GET',
                isArray: false
            }
        })
    }

    function RefugeePostService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + "post/refugee/:page", { page: "@id" }, {
            'get': {
                method: 'GET',
                isArray: false
            }
        })
    }

    function PostService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + "post/:postId", { postId: "@id" }, {
            'get': {
                method: 'GET',
                isArray: false
            }
        })
    }

})();