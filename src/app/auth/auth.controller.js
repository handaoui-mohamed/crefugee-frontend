(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthController', AuthController);

    function AuthController($log, $auth, $window, $state, $rootScope, RegisterService, toastr, ErrorToast, $translate) {
        var vm = this;

        vm.register = false;
        vm.loginUser = loginUser;
        vm.registerUser = registerUser;

        function registerUser(){
            vm.disableSubmit = true;
            toastr.clear([toastr]);
            RegisterService.save(vm.user,function(){
                toastr.success($translate.instant("CONNECTING"),$translate.instant("REGISTERSUCCESS"));
                vm.loginUser();
            }, function(error){
                ErrorToast(error);
                vm.disableSubmit = false;
            });
        }
 
        function loginUser(){
            vm.disableSubmit = true;
            toastr.clear([toastr]);
            $auth.login(vm.user).then(function (response) {
                if (!response.data.errors) {
                    toastr.success($translate.instant('REDIRECTING'), $translate.instant("HELLO"));
                    $window.localStorage['current_user'] = response.data.user.id;
                    $rootScope.current_user = response.data.user;
                    $state.go('profile');
                }else{
                     toastr.error($translate.instant("USEREXIST"), $translate.instant("CONNECTIONERROR"));
                }
                vm.disableSubmit = false;
            }, function (error) {
                toastr.error($translate.instant("USEREXIST"), $translate.instant("CONNECTIONERROR"));
                vm.disableSubmit = false;
            });
        }
    }
})();
