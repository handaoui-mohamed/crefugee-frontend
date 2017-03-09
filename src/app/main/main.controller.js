(function() {
    'user strict';
    angular
        .module('app.main')
        .controller('MainController', MainController);

    function MainController($state, $window, $auth, $translate, $rootScope) {
        var vm = this;

        vm.logout = logout;
        vm.state = $state;
        vm.changeLanguage = changeLanguage;

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

    }
})();