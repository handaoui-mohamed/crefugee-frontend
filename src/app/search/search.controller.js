(function() {
    'use strict';

    angular
        .module('main.search')
        .controller('SearchController', SearchController);

    function SearchController($translate, $stateParams, Upload, API_ENDPOINT, toastr, PostRatingService ,TagService, HelperPostService, RefugeePostService, PostService, ErrorToast) {
        var vm = this;
        vm.postService = null;
        vm.posts = [];
        vm.page = 1;
        vm.limit = 5;
        vm.selectedTags = [];
        vm.selectedTag = "";
        vm.selectedRating = 0;



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
        vm.addPost = addPost;
        vm.saveRating = saveRating;

        function saveRating(post, loggedIn){
            if (post && loggedIn){
                PostRatingService.save({"value": vm.selectedRating, "post_id": post.id}, function(data){
                     post.rating = data.element.rating;
                }, function(error){
                    ErrorToast(error);
                });
            }
        }

        function addPost() {
            vm.newPost.tags = vm.selectedTags;
            PostService.save(vm.newPost, function(data) {
                if(vm.postfile){
                    vm.uploadPostPicture(vm.postfile, data.element.id);   
                }else{
                    $("#addPost").modal('hide');
                    vm.posts.unshift(data.element);
                }
                toastr.success("Le post a été ajouter avec succee")
            }, function(error) {
                ErrorToast(error);
            });
        }

        function uploadPostPicture(file, postId) {
            vm.file = file;
            Upload.upload({
                url: API_ENDPOINT + 'posts/uploads/' + postId,
                data: { post_image: file }
            }).then(function(resp) {
                toastr.info($translate.instant('UPLOADED'));
                $("#addPost").modal('hide');
                vm.posts.unshift(resp.element);
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
        }

        function getTagName(tagId) {
            var selected_tag = vm.tags.find(function(tag) {
                return tag.id === parseInt(tagId);
            });
            return selected_tag.name;
        }


        function openModal(post, model, loggedIn) {
            $(model).modal('show');
            if (post) {
                vm.selectedPost = post;
                if (loggedIn){
                    RatingService.get({"post_id":post.id}, function(data){
                        vm.selectedRating = data.element.value; 
                    }, function(error){
                        vm.selectedRating = 0;
                        ErrorToast(error);
                    });
                }else{
                    vm.selectedRating = post.rating;
                }
            }
        }

        function getLocalPostTime(utcDate) {
            var date = new Date(utcDate);
            return date.toLocaleString()
        }
    }
})();