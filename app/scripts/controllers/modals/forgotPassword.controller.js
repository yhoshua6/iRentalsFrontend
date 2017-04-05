/**
 * Created by jose- on 01/02/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("forgotPwdCtrl", forgotPwdCtrl);


  forgotPwdCtrl.$inject = ["$mdDialog", "requestService", "toastServices", "FORGOT_PWD"];
  function forgotPwdCtrl($mdDialog, requestService, toastServices, FORGOT_PWD) {
    var forgotPwdScope = this;
    forgotPwdScope.user = '';
    forgotPwdScope.sending = false;

    forgotPwdScope.sendPwd = function () {
      forgotPwdScope.sending = !forgotPwdScope.sending;
      var data = {
        user: forgotPwdScope.user
      };
      var pwdPromise = requestService.getPromise("POST", FORGOT_PWD, requestService.formatData(data), null);
      pwdPromise.then(function (response) {
        console.log("asdasd");
        toastServices.toastIt(response.status, "email_sent");
        forgotPwdScope.sending = !forgotPwdScope.sending;
        $mdDialog.hide();
      });
    };


    forgotPwdScope.hide = function() {
      $mdDialog.hide();
    };

    forgotPwdScope.cancel = function() {
      $mdDialog.cancel();
    };
  }

})();
