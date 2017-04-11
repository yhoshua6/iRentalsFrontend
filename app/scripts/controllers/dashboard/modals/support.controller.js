/**
 * Created by jose- on 3/31/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("supportCtrl", supportCtrl);

  supportCtrl.$inject = ["$mdDialog", "requestService", "userInfoService", "toastServices", "SUPPORT"];
  function supportCtrl($mdDialog, requestService, userInfoService, toastServices, SUPPORT) {
    var supportScope = this;
    supportScope.comments = '';
    supportScope.sending = false;

    supportScope.askForHelp = function () {
      supportScope.sending = !supportScope.sending;
      var data = {
        user: userInfoService.user.user,
        email: userInfoService.user.email,
        comments: supportScope.comments
      };
      var supportPromise = requestService.getPromise("POST", SUPPORT, requestService.formatData(data), null);
      supportPromise.then(function (response) {
        supportScope.sending = !supportScope.sending;
        toastServices.toastIt(response.status, "email_sent");
        supportScope.hide();
      });
    };

    supportScope.hide = function() {
      $mdDialog.hide();
    };

    supportScope.cancel = function() {
      $mdDialog.cancel();
    };

  }

})();
