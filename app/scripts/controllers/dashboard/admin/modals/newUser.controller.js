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

  newUserCtrl.$inject = ["$log", "$mdDialog", "requestService", "INFO_USER"];
  function newUserCtrl($log, $mdDialog, requestService, INFO_USER) {
    var newUserScope = this;
    newUserScope.name = "";
    newUserScope.cellphone = "";
    newUserScope.bankName = "";
    newUserScope.bankClabe = 0;
    newUserScope.bankAccount = 0;
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
      $log.log("/////////////////////",newUserScope.user);
      var newUser = {
        info_user: {
          name: newUserScope.name,
          cellphone: newUserScope.cellphone,
          bankName: newUserScope.bankName,
          bankClabe: newUserScope.bankClabe,
          bankAccount: newUserScope.bankAccount,
          cedula: newUserScope.cedula
        }
      };
      var userInfo = requestService.getPromise("POST", INFO_USER, requestService.formatData(newUser));
      userInfo.then(function (response) {
        newUser = {
          user: {
            user: newUserScope.user,
            password: newUserScope.pwd,
            password_confirmation: newUserScope.pwd,
            info_id: response.data.id,
            role_id: "9d819262-6437-4fef-9791-c8a7ff981cdb"
          }
        };
        $log.log(newUser);
        $mdDialog.hide(newUser)
      });
    };
  }

})();
