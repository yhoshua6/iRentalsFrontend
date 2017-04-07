/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .service("userInfoService", userInfo);

  userInfo.$inject = ["requestService", "BRANCHES_ROLES", "BRANCHES"];
  function userInfo (requestService, BRANCHES_ROLES, BRANCHES) {
    var userScope = this;
    userScope.user = {};

    userScope.setUserInfo = function (response) {
      userScope.user = {
        authToken: response.data.authToken,
        infoId: response.data.infoId,
        role: response.data.role,
        notificationRoles: response.data.notificationRoles,
        id: response.data.id,
        email: response.data.email,
        partPool: response.data.partPool,
        userName: response.data.userName,
        user: response.data.user,
        cellphone: response.data.cellphone,
        bankName: response.data.bankName,
        bankAccount: response.data.bankAccount,
        bankClabe: response.data.bankClabe,
        paymentMethod: response.data.paymentMethod,
        rfc: response.data.rfc
      };
      userScope.user.branches = [];
      userScope.setCurrentBranchToUser();
    };

    userScope.getBranch = function (filter) {
      if (userScope.user.branches) {
        for(var i=0; i<userScope.user.branches.length; i++) {
          if (userScope.user.branches[i].type === filter) {
            return  i;
          }
        }
      }
    };

    userScope.setBranch = function (branchIndex) {
      userScope.user.currentBranch = userScope.user.branches[branchIndex].branchId;
      userScope.user.branchLocation = userScope.user.branches[branchIndex].location;
    };

    userScope.setCurrentBranchToUser = function () {
      var branchRole = requestService.getPromise(
        "GET",
        BRANCHES_ROLES,
        null,
        userScope.user.authToken
      );

      branchRole.then(function (response) {
        if (response.status === 200 && response.data) {
          for(var i=0; i<response.data.length; i++) {
            var branch = {
              roleId: response.data[i].branch_id,
              isSender: checkIfUserHasPermissions(response.data[i].receiver_id, response.data[i].sender_id),
              type: response.data[i].branch_type
            };
            setBranch(branch);
          }
        } else {
          userScope.user.isSender = false;
        }
      });
    };

    function setBranch (branch) {
      var branchPromise = requestService.getPromise(
        "GET",
        BRANCHES + "/" + branch.roleId,
        null,
        userScope.user.authToken
      );

      branchPromise.then(function (response) {
        if (response.status === 200) {
          branch.branchId = response.data.id;
          branch.propertyId = response.data.propertyId;

          switch (response.data.branch_type) {
            case "Facturas":
              branch.location = "bills";
              break;

            case "Documentos":
              branch.location = "documents";
              break;

            case "Asambleas":
              branch.location = "gatherings";
              break;

            case "Reportes":
              branch.location = "reports";
              break;

            case "Comprobantes":
              branch.location = "vouchers";
              break;
          }
        }
        userScope.user.branches.push(branch);
      });
    }

    function checkIfUserHasPermissions(receiverId, senderId) {
      return ((userScope.user.id !== receiverId) && (userScope.user.id === senderId));
    }

  }
})();
