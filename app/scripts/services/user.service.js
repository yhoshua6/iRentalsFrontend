/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .service("userInfoService", userInfo);

  userInfo.$inject = ["$log", "requestService", "BRANCHES_ROLES", "BRANCHES"];
  function userInfo ($log, requestService, BRANCHES_ROLES, BRANCHES) {
    var userScope = this;
    userScope.user = {};

    userScope.setUserInfo = function (response) {
      userScope.user = {
        authToken: response.data.authToken,
        infoId: response.data.infoId,
        role: response.data.role,
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

    userScope.setCurrentBranchToUser = function (filterBranch) {
      var branchRole = requestService.getPromise(
        "GET",
        BRANCHES_ROLES + "/" + userScope.user.id + "?filter=" + filterBranch,
        null,
        userScope.user.authToken
      );

      branchRole.then(function (response) {
        if (response.status === 200) {
          if (response.data) {
            userScope.user.branchId = response.data.branch_id;
            userScope.user.isSender = checkIfUserHasPermissions(response.data.receiver_id, response.data.sender_id);
            setBranch(filterBranch);
          }
        }
      });
    };

    function setBranch (branchFilter) {
      var branch = {
        branch: {
          filter: branchFilter
        }
      };

      var branchPromise = requestService.getPromise(
        "GET",
        BRANCHES + "/" + userScope.user.branchId,
        requestService.formatData(branch),
        userScope.user.authToken
      );

      branchPromise.then(function (response) {
        if (response.status === 200) {
          userScope.user.currentBranch = response.data.id;
          switch (response.data.branch_type) {
            case "Facturas":
              userScope.user.branchLocation = "bills";
              break;

            case "Documentos":
              userScope.user.branchLocation = "documents";
              break;

            case "Asambleas":
              userScope.user.branchLocation = "gatherings";
              break;

            case "Reportes":
              userScope.user.branchLocation = "reports";
              break;

            case "Comprobantes":
              userScope.user.branchLocation = "vouchers";
              break;
          }
        }
        $log.log(userScope.user);
      });
    }

    function checkIfUserHasPermissions(receiverId, senderId) {
      return ((userScope.user.id !== receiverId) && (userScope.user.id === senderId));
    }

  }
})();
