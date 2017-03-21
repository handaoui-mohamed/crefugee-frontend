(function() {
    'use strict';

    angular
        .module('main.profile')
        .controller('ProfileController', ProfileController);

    function ProfileController(ProfileService, TagService, Upload, API_ENDPOINT, ErrorToast, toastr, $translate) {
        var vm = this;

        vm.selectedTags = [];

        toastr.clear([toastr]);

        ProfileService.get(function(data) {
            vm.user = data.element;
            vm.user.tags.forEach(function(tag) {
                vm.selectedTags.push("" + tag.id)
            })
        }, function(errors) {
            ErrorToast(errors)
        })

        TagService.get(function(data) {
            vm.tags = data.elements;
        }, function(errors) {
            ErrorToast(errors)
        })

        vm.updateProfile = updateProfile;
        vm.uploadProfilePicture = uploadProfilePicture;
        vm.getTagName = getTagName;
        vm.addTag = addTag;
        vm.removeTag = removeTag;
        vm.uploadLegalDocument = uploadLegalDocument;

        function addTag() {
            var selectedTag = vm.tags.find(function(tag) {
                return tag.id === parseInt(vm.selectedTag);
            });

            if (vm.selectedTag && !vm.selectedTags.includes(vm.selectedTag)) {
                vm.selectedTags.push(vm.selectedTag);
            }
        }

        function removeTag(index) {
            vm.selectedTags.splice(index, 1);
            console.log(vm.selectedTags)
        }

        function getTagName(tagId) {
            if (vm.tags) {
                var selected_tag = vm.tags.find(function(tag) {
                    return tag.id === parseInt(tagId);
                });
                return selected_tag.name;
            }
        }

        function updateProfile() {
            vm.disabled = true;
            vm.user.tags = vm.selectedTags;
            ProfileService.update(vm.user, function(data) {
                vm.user = data.element;
                toastr.info($translate.instant('UPDATED'));
                vm.disabled = false;
            }, function(error) {
                ErrorToast(error);
                vm.disabled = false;
            });
            vm.update_password = false;
        }

        function uploadProfilePicture(file) {
            vm.file = file;
            Upload.upload({
                url: API_ENDPOINT + 'profile/uploads',
                data: { profile_image: file }
            }).then(function(resp) {
                toastr.info($translate.instant('UPLOADED'));
            }, function(resp) {
                ErrorToast(resp);
            }, function(evt) {
                vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }

        function uploadLegalDocument(file) {
            vm.file = file;
            Upload.upload({
                url: API_ENDPOINT + 'legaldocument/uploads/',
                data: { legal_document: file }
            }).then(function(resp) {
                toastr.info($translate.instant('UPLOADED'));
            }, function(resp) {
                ErrorToast(resp);
            }, function(evt) {
                vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    }
})();