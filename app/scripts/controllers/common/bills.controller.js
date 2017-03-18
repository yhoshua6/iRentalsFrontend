(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("billsCtrl", billsCtrl);

  billsCtrl.$inject = ["$mdSidenav", "$log", "userInfoService", "requestService", "BRANCHES", "FILES_DEPOT"];
  function billsCtrl($mdSidenav, $log, userInfoService, requestService, BRANCHES, FILES_DEPOT) {
    var billsScope = this;
    billsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    billsScope.files = [];
    billsScope.selected = [];
    billsScope.getFilesToPay = true;
    billsScope.isAdmin = function () {
      return userInfoService.user.role === "Administrador";
    };

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
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function(newBranch) {
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
