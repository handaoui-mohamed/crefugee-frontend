(function() {
    'use strict';

    angular
        .module('main.search')
        .controller('SearchController', SearchController);

    function SearchController($stateParams, TagService, HelperPostService, RefugeePostService, PostService, ErrorToast) {
        var vm = this;
        vm.postService = null;
        vm.page = 1;
        vm.selectedTags = [];



        vm.default_post_image = "assets/images/default_thumbnail.jpg"

        switch ($stateParams.type) {
            case "helper":
                vm.postService = HelperPostService;
                break;
            case "refugee":
                vm.postService = RefugeePostService;
                break;
            default:
                vm.postService = PostService;
                break;
        }

        vm.postService.get({ page: vm.page }, function(data) {
            vm.posts = data.elements;
        }, function(errors) {
            ErrorToast(errors);
        });

        TagService.get(function(data) {
            vm.tags = data.elements;
        }, function(error) {
            ErrorToast(error);
        });

        vm.getLocalPostTime = getLocalPostTime;
        vm.openModal = openModal;
        vm.addTag = addTag;
        vm.getTagName = getTagName;
        vm.removeTag = removeTag;
        vm.uploadPostPicture = uploadPostPicture;
        vm.addPost = addPos

        function addPost() {
            PostService.save(vmSr.newPost, function(data) {

                vm.uploadPostPicture(vmSr.postfile, data.element.id);
            }, function(error) {

            });
        }

        function uploadPostPicture(file, postId) {
            vm.file = file;
            Upload.upload({
                url: API_ENDPOINT + 'upload/' + postId,
                data: { post_image: file }
            }).then(function(resp) {
                toastr.info($translate.instant('UPLOADED'));
            }, function(resp) {
                ErrorToast(resp);
            }, function(evt) {
                vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }

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
            var selected_tag = vm.tags.find(function(tag) {
                return tag.id === parseInt(tagId);
            });
            return selected_tag.name;
        }


        function openModal(post, model) {
            $(model).modal('show');
            if (post) {
                vm.selectedPost = post;
            }
        }

        function getLocalPostTime(utcDate) {
            var date = new Date(utcDate);
            return date.toLocaleString()
        }
    }
})();