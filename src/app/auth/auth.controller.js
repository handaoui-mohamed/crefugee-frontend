(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthController', AuthController);

    function AuthController($log, $auth, $window, $state, $rootScope, RegisterService, toastr, ErrorToast, $translate) {
        var vm = this;

        vm.user_to_login = {};
        vm.loginUser = loginUser;
        vm.registerUser = registerUser;

        function registerUser() {
            vm.disableRegister = true;
            toastr.clear([toastr]);
            RegisterService.save(vm.user_to_register, function() {
                toastr.success($translate.instant("CONNECTING"), $translate.instant("REGISTERSUCCESS"));
                vm.loginUser(true);
            }, function(error) {
                ErrorToast(error);
                vm.disableRegister = false;
            });
        }

        function loginUser(registered) {
            vm.disableLogin = true;
            if (registered) {
                vm.user_to_login.username = vm.user_to_register.username;
                vm.user_to_login.password = vm.user_to_register.password;
                vm.remember_me = false;
            }
            toastr.clear([toastr]);
            $auth.login(vm.user_to_login).then(function(response) {
                if (!response.data.errors) {
                    toastr.success($translate.instant('REDIRECTING'), $translate.instant("HELLO"));
                    $window.localStorage['current_user'] = response.data.user.id;
                    $rootScope.current_user = response.data.user;
                    if (registered) $state.go('main.profile');
                    else {
                        $state.go('main.userprofile', { username: $rootScope.current_user.username });
                    }
                } else {
                    toastr.error($translate.instant("USEREXIST"), $translate.instant("CONNECTIONERROR"));
                }
                vm.disableLogin = false;
            }, function(error) {
                toastr.error($translate.instant("USEREXIST"), $translate.instant("CONNECTIONERROR"));
                vm.disableLogin = false;
            });
        }
    }
})();