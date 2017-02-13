/**
 * Created by jose- on 04/02/2017.
 */
(function () {
  "use strict";
  // If we do not have CryptoJS defined; import it
  if (typeof CryptoJS == 'undefined') {
    var cryptoSrc = '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', cryptoSrc);
    document.body.appendChild(scriptTag);
  }
  angular.module("iRentalsApp")
    .controller("newUserCtrl", newUserCtrl);

  newUserCtrl.$inject = ["$log", "$mdDialog"];
  function newUserCtrl($log, $mdDialog) {
    var newUserScope = this;
    newUserScope.name = "";
    newUserScope.cellphone = "";
    newUserScope.bankName = "";
    newUserScope.bankClabe = "";
    newUserScope.bankAccount = "";
    newUserScope.cedula = "";
    newUserScope.user = "";
    newUserScope.pwd = "";

    newUserScope.hide = function() {
      $mdDialog.hide();
    };

    newUserScope.cancel = function() {
      $mdDialog.cancel();
    };

    newUserScope.save = function() {
      var newNotification = {
        id: 0,
        name: newUserScope.name,
        cellphone: newUserScope.cellphone,
        bankName: newUserScope.bankName,
        bankClabe: newUserScope.bankClabe,
        bankAccount: newUserScope.bankAccount,
        cedula: newUserScope.cedula,
        user: newUserScope.email,
        pwd: newUserScope.pwd
      };
      $mdDialog.hide(newNotification);
    };
  }

})();
