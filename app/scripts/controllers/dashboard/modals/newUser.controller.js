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

  newUserCtrl.$inject = ["$log", "$mdDialog", "userInfoService", "requestService", "INFO_USER", "USER_ROLES"];
  function newUserCtrl($log, $mdDialog, userInfoService, requestService, INFO_USER, USER_ROLES) {
    var newUserScope = this;
    newUserScope.name = "";
    newUserScope.cellphone = "";
    newUserScope.bankName = "";
    newUserScope.bankClabe = 0;
    newUserScope.bankAccount = 0;
    newUserScope.cedula = "";
    newUserScope.email = "";
    newUserScope.user = "";
    newUserScope.roles = [];
    newUserScope.selectedRole = "";
    newUserScope.paymentOptions = [
      { id: 0, method: "Cheque" },
      { id: 1, method: "Transferencia" }
    ];

    var rolesPomise = requestService.getPromise("GET", USER_ROLES, null, userInfoService.user.authToken)
    rolesPomise.then(function (response) {
      newUserScope.roles = response.data;
    });

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
          payment_method: newUserScope.payment_method,
          cellphone: newUserScope.cellphone,
          bank_name: newUserScope.bankName,
          bank_clabe: newUserScope.bankClabe,
          bank_account: newUserScope.bankAccount,
          cedula: newUserScope.cedula
        },
        user: {
          user: newUserScope.user,
          role_id: newUserScope.selectedRole
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
