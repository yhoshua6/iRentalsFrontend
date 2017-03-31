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

  newUserCtrl.$inject = ["$log", "$mdDialog", "userInfoService", "requestService", "INFO_USER"];
  function newUserCtrl($log, $mdDialog, userInfoService, requestService, INFO_USER) {
    var newUserScope = this;
    newUserScope.name = "";
    newUserScope.cellphone = "";
    newUserScope.bankName = "";
    newUserScope.bankClabe = 0;
    newUserScope.bankAccount = 0;
    newUserScope.rfc = "";
    newUserScope.email = "";
    newUserScope.user = "";
    newUserScope.roles = [];
    newUserScope.paymentMethod = "";
    newUserScope.selectedRole = "";
    newUserScope.paymentOptions = [
      { id: 0, method: "Cheque" },
      { id: 1, method: "Transferencia" }
    ];
    newUserScope.roles = [
      { id: 0, role: "Condómino"},
      { id: 1, role: "Arrendatario"},
      { id: 2, role: "Administrador"}
    ];

    newUserScope.hide = function() {
      $mdDialog.hide();
    };

    newUserScope.cancel = function() {
      $mdDialog.cancel();
    };

    newUserScope.save = function() {
      var newUser = {
        info_user: {
          name: newUserScope.name,
          email: newUserScope.email,
          payment_method: newUserScope.paymentMethod,
          cellphone: newUserScope.cellphone,
          bank_name: newUserScope.bankName,
          bank_clabe: newUserScope.bankClabe,
          bank_account: newUserScope.bankAccount,
          rfc: newUserScope.rfc
        },
        user: {
          user: newUserScope.user,
          role: newUserScope.selectedRole
        }
      };
      var userInfo = requestService.getPromise("POST", INFO_USER, requestService.formatData(newUser), userInfoService.user.authToken);
      userInfo.then(function (response) {
        if (response.status === 201) {
          newUser.user.info_id = response.data.id;
          newUser.info_user.id = response.data.id;
          $mdDialog.hide(newUser)
        }
      });
    };
  }

})();
