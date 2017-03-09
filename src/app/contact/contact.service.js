(function(){
    'use strict';

    angular
        .module("app.contact")
        .factory("ContactService", ContactService);

    function ContactService($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + 'contact');
    }
})();
