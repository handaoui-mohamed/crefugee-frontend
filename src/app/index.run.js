(function() {
    'use strict';

    angular
        .module('app')
        .run(run);

    function run($auth, $log, $rootScope, $state, $location, $window, UserService, ErrorToast) {
        var user_id = $window.localStorage['current_user'];
        if (user_id) {
            UserService.get({ userId: user_id }, function(data) {
                $rootScope.current_user = data.element;
            }, function(errors) {
                ErrorToast(errors);
            });
        }

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            var notAllowedStates = ['/auth', '/reset'];

            if (notAllowedStates.indexOf($location.url()) === -1)
                $rootScope.next = $location.url();

            if ($auth.isAuthenticated()) {
                if (notAllowedStates.indexOf(toState['url']) !== -1) {
                    event.preventDefault();
                    $state.go('home');
                }
            } else {
                if (toState['loginRequired']) {
                    event.preventDefault();
                    $state.go('auth');
                }
            }
        });

        $rootScope.$on('$stateChangeSuccess', function() {
            // document.getElementById("scroll-to-top").click();
        });
    }
})();