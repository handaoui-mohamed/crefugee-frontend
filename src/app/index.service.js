(function() {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService)
        .factory('TagService', TagService)
        .factory('ErrorToast', ErrorToast)
        .factory('MessageService', MessageService);

    function UserService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + 'users/:userId', { userId: '@id' }, {
            'get': {
                method: 'GET',
                isArray: false
            }
        });
    }

    function TagService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + 'tags/:tagId', { tagId: '@id' }, {
            'get': {
                method: 'GET',
                isArray: false
            }
        });
    }

    function MessageService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + 'messages/:receiverId/:page', { receiverId: '@id', page: '@id' }, {
            'get': {
                method: 'GET',
                isArray: false
            }
        });
    }


    function ErrorToast(toastr, $translate) {
        // TODO: change form-errors
        return function(errors) {
            switch (errors.status) {
                case 400:
                    for (var fieldName in errors.data['form_errors']) {
                        if (errors.data['form_errors'].hasOwnProperty(fieldName)) {
                            toastr.warning(errors.data['form_errors'][fieldName][0]);
                            break;
                        }
                    }
                    break;
                case 404:
                    toastr.warning($translate.instant("ERROR.404"));
                    break;
                case 401:
                    toastr.warning($translate.instant("ERROR.401"));
                    break;
                case 500:
                    toastr.error($translate.instant("ERROR.500"));
                    break;
            }
        }
    }
})();