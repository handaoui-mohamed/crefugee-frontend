(function() {
    'use strict';

    angular
        .module("app.contact")
        .controller("ContactController", ContactController);

    function ContactController(ContactService, toastr, ErrorToast, $translate) {
        var vm = this;
        vm.mail = {};

        vm.send = send;

        function send() {
            ContactService.save(vm.mail, function() {
                toastr.success($translate.instant("MAILSENT"));
            }, function(errors) {
                ErrorToast(errors);
            });
        }
    }
})();