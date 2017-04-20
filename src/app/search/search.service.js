(function() {
    'use strict';

    angular
        .module('main.search')
        .factory('HelperPostService', HelperPostService)
        .factory('RefugeePostService', RefugeePostService)
        .factory('PostService', PostService)
        .factory('RatingService', RatingService);

    function HelperPostService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + "posts/helper/:page", { page: "@id" }, {
            'get': {
                method: 'GET',
                isArray: false
            }
        })
    }

    function RefugeePostService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + "posts/refugee/:page", { page: "@id" }, {
            'get': {
                method: 'GET',
                isArray: false
            }
        })
    }

    function PostService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + "posts/:postId", { postId: "@id" }, {
            'get': {
                method: 'GET',
                isArray: false
            }
        })
    }

    function RatingService($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + "ratings", null,{
            'get': {
                method: 'GET',
                isArray: false
            }
        })
    }
})();