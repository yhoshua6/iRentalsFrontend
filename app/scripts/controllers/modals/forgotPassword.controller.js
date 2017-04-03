/**
 * Created by jose- on 01/02/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("forgotPwdCtrl", forgotPwdCtrl);


  forgotPwdCtrl.$inject = ["$log", "$mdDialog", "requestService", "FORGOT_PWD"];
  function forgotPwdCtrl($log, $mdDialog, requestService, FORGOT_PWD) {
    var forgotPwdScope = this;
    forgotPwdScope.user = '';

    forgotPwdScope.sendPwd = function () {
      var data = {
        user: forgotPwdScope.user
      };
      var pwdPromise = requestService.getPromise("POST", FORGOT_PWD, requestService.formatData(data), null);
      pwdPromise.then(function (response) {
        $log.log(response);
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
