(function() {
    'user strict';
    angular
        .module('app.main')
        .controller('MainController', MainController);

    function MainController(UserService, MessageService, ErrorToast, $state, $window, $auth, $translate, $rootScope) {
        var vm = this;
        vm.messages = [];
        vm.new_message = {};

        vm.default_profile_image = "assets/images/avatar.png";

        // UserService.get(function(data) {
        //     vm.users = data.elements;
        //     vm.user = $rootScope.current_user;
        // }, function(error) {
        //     ErrorToast(error);
        // });

        vm.logout = logout;
        vm.state = $state;
        vm.changeLanguage = changeLanguage;
        vm.getMessages = getMessages;
        vm.sendMessage = sendMessage;
        vm.getLocalPostTime = getLocalPostTime;

        if ($window.location.pathname === "/" || $window.location.pathname === "") $state.go("main.home");

        function logout() {
            $window.localStorage.removeItem('current_user');
            $auth.logout();
            delete $rootScope.current_user;
            $state.go('auth');
        }

        // Change Language
        function changeLanguage(lang) {
            if (lang != "fr" && lang != "ar" && lang != "en") return;
            $translate.use(lang);
        }

        function getMessages(user) {
            vm.messages = []
            MessageService.get({ receiverId: user.id }, function(data) {
                vm.messages = vm.messages.concat(data.elements);
                vm.show = true;
                vm.selectedUser = user;
            }, function(error) {
                ErrorToast(error);
            });
        }

        function sendMessage() {
            vm.new_message.receiver_id = vm.selectedUser.id;
            MessageService.save(vm.new_message, function(data) {
                vm.messages.push(data.element);
                vm.new_message = {}
            }, function(error) {
                ErrorToast(error);
            });
        }

        function getLocalPostTime(utcDate) {
            var date = new Date(utcDate);
            return date.toLocaleDateString()
        }

    }
})();