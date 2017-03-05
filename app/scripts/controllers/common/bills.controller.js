(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("billsCtrl", billsCtrl);

  billsCtrl.$inject = ["$mdDialog", "$log", "userInfoService", "requestService", "BRANCHES", "BRANCHES_ROLES", "FILES_DEPOT"];
  function billsCtrl($mdDialog, $log, userInfoService, requestService, BRANCHES, BRANCHES_ROLES, FILES_DEPOT) {
    var billsScope = this;
    billsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    billsScope.files = [];
    billsScope.selected = [];
    billsScope.getFilesToPay = true;

    var filesDepotPromise = requestService.getPromise(
      "GET",
      FILES_DEPOT,
      null,
      userInfoService.user.authToken
    );

    filesDepotPromise.then(function (response) {
      if (response.status === 200) {
        billsScope.files = response.data;
      }
    });

    var branchesRolesPromise = requestService.getPromise(
      "GET",
      BRANCHES_ROLES + "/" + userInfoService.user.branchRoleId,
      null,
      userInfoService.user.authToken
    );

    branchesRolesPromise.then(function (response) {
      if (response.status === 200) {
        $log.log(response);
        //billsScope.branches = response.data;
        billsScope.branchId = response.data.branch_id;
        billsScope.isSender = checkIfUserHasPermissions(response.data.receiver_id, response.data.sender_id);
      }
    });


    billsScope.newFile = function (event) {
      $mdDialog.show({
        controller: "newFileCtrl",
        controllerAs: "newFileCtrl",
        templateUrl: "../../../../views/common/modals/upload_file.html",
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true
      }).then(function(newBranch) {
        newBranch.depot_file.owner_id = billsScope.branchId;

        var filesDepotPromise = requestService.getPromise(
          "POST",
          FILES_DEPOT,
          requestService.formatData(newBranch),
          userInfoService.user.authToken
        );

        filesDepotPromise.then(function (response) {
          if (response.status === 201) {
            billsScope.files.push(response.data);
          }
        });

      }, function () {});
    };

    function checkIfUserHasPermissions(receiverId, senderId) {
      return ((userInfoService.user.id !== receiverId) && (userInfoService.user.id === senderId));
    }
  }
})();
