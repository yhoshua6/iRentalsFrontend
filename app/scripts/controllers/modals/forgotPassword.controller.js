/**
 * Created by jose- on 01/02/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("forgotPwdCtrl", forgotPwdCtrl);


  forgotPwdCtrl.$inject = ["$log", "$mdDialog"];
  function forgotPwdCtrl($mdDialog) {
    var forgotPwdScope = this;


    forgotPwdScope.hide = function() {
      $mdDialog.hide();
    };

    forgotPwdScope.cancel = function() {
      $mdDialog.cancel();
    };
  }

})();
