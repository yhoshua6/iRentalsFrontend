(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("billsCtrl", billsCtrl);

  billsCtrl.$inject = ["$mdDialog", "$mdSidenav", "$log", "userInfoService", "requestService", "BRANCHES", "FILES_DEPOT"];
  function billsCtrl($mdDialog, $mdSidenav, $log, userInfoService, requestService, BRANCHES, FILES_DEPOT) {
    var billsScope = this;
    billsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    billsScope.files = [];
    billsScope.selected = [];
    billsScope.getFilesToPay = true;

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    var branch = {
      branch: {
        filter: "Facturas"
      }
    };

    var branchPromise = requestService.getPromise(
      "GET",
      BRANCHES + "/" + userInfoService.user.branchId,
      requestService.formatData(branch),
      userInfoService.user.authToken
    );

    branchPromise.then(function (response) {
      if (response.status === 200) {
        billsScope.isSender = checkIfUserHasPermissions(response.data.receiver_id, response.data.sender_id);
      }
    });

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
