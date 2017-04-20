(function() {
    'use strict';

    angular
        .module("main.home")
        .controller("HomeController", HomeController);

    function HomeController($scope, $timeout) {
        var vm = this;
        
        $scope.$on('$viewContentLoaded', function() {
            $timeout(function(){
                 $('.flexslider').flexslider({
                    animation: "slide",
                    start: function(slider) {
                        $('body').removeClass('loading');
                    }
                });
            });
        });
    }
})();