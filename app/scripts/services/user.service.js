/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .service("userInfoService", userInfo);

  userInfo.$inject = ["$log", "requestService", "INFO_USER"];
  function userInfo ($log, requestService, INFO_USER) {
    var userScope = this;
    userScope.user = {};

    userScope.setUserInfo = function (response) {
      userScope.user = {
        authToken: response.data.authToken,
        infoId: response.data.infoId,
        role: response.data.role,
        branchId: response.data.branchId,
        notificationRoleId: response.data.notificationRole,
        id: response.data.id,
        userName: response.data.userName,
        cellphone: response.data.cellphone,
        bankName: response.data.bankName,
        bankAccount: response.data.bankAccount,
        bankClabe: response.data.bankClabe,
        paymentMethod: response.data.paymentMethod,
        rfc: response.data.rfc
      };
    };

  }
})();
