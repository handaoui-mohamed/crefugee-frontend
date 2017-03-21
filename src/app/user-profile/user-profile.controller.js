(function() {
    'use strict';

    angular
        .module('app.userprofile')
        .controller('UserProfileController', UserProfileController);

    function UserProfileController($log, UserService, $stateParams, $state, ErrorToast) {
        var vm = this;

        vm.default_profile_image = "assets/images/avatar.png";
        vm.default_post_image = "assets/images/default_thumbnail.jpg"

        UserService.get({ username: $stateParams.username }, function(data) {
            vm.user = data.element;
        }, function(errors) {
            $state.go('main.home');
            ErrorToast(errors);
        });

        vm.getLocalPostTime = getLocalPostTime;

        function getLocalPostTime(utcDate) {
            var date = new Date(utcDate);
            return date.toLocaleString()
        }
    }
})();