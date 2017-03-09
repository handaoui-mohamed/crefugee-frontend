(function() {
    'use strict';

    angular
        .module('main.profile')
        .controller('ProfileController', ProfileController);

    function ProfileController(ProfileService, Upload, API_ENDPOINT, ErrorToast, toastr, $translate) {
        var vm = this;

        toastr.clear([toastr]);

        ProfileService.get(function(data) {
            vm.profile = data.element;
        }, function(errors) {
            ErrorToast(errors)
        })

        vm.updateProfile = updateProfile;
        vm.uploadProfilePicture = uploadProfilePicture;

        function updateProfile() {
            vm.disabled = true;
            ProfileService.update(vm.profile, function(data) {
                vm.profile = data.element;
                toastr.info($translate.instant('PROFILE.UPDATED'));
                vm.disabled = false;
            }, function(error) {
                ErrorToast(error);
                vm.disabled = false;
            });
        }

        function uploadProfilePicture(file) {
            vm.file = file;
            Upload.upload({
                url: API_ENDPOINT + 'upload/profile',
                data: { profile_image: file }
            }).then(function(resp) {
                vm.profile.profile_image = resp.data.element.profile_image;
                if (vm.profile.profile_image.length > 0) {
                    vm.profile_image = vm.profile.profile_image[0];
                }

                toastr.info($translate.instant('PROFILE.UPLOADED'));
            }, function(resp) {
                ErrorToast(resp);
            }, function(evt) {
                vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    }
})();