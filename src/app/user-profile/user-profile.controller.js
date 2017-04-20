(function() {
    'use strict';

    angular
        .module('app.userprofile')
        .controller('UserProfileController', UserProfileController);

    function UserProfileController($log, UserService, $stateParams, $state, ErrorToast, RatingService) {
        var vm = this;
        vm.limit = 3;
        vm.default_profile_image = "assets/images/avatar.png";
        vm.default_post_image = "assets/images/default_thumbnail.jpg";
        vm.selectedRating = 0;

        UserService.get({ username: $stateParams.username }, function(data) {
            vm.user = data.element;
        }, function(errors) {
            $state.go('main.home');
            ErrorToast(errors);
        });

        vm.getLocalPostTime = getLocalPostTime;
        vm.openModal = openModal;
        vm.saveRating = saveRating;

        function getLocalPostTime(utcDate) {
            var date = new Date(utcDate);
            return date.toLocaleString()
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

        function saveRating(post, loggedIn){
            if (post && loggedIn){
                RatingService.save({"value": vm.selectedRating, "post_id": post.id}, function(data){
                     post.rating = data.element.rating;
                }, function(error){
                    ErrorToast(error);
                });
            }
        }
    }
})();