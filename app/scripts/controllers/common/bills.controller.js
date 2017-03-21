(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("billsCtrl", billsCtrl);

  billsCtrl.$inject = ["$mdSidenav", "$log", "userInfoService", "requestService", "crudService", "BRANCHES", "FILES_DEPOT"];
  function billsCtrl($mdSidenav, $log, userInfoService, requestService, crudService, BRANCHES, FILES_DEPOT) {
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
      FILES_DEPOT + "/" + userInfoService.user.branchId,
      null,
      userInfoService.user.authToken
    );

    filesDepotPromise.then(function (response) {
      if (response.status === 200) {
        billsScope.files = response.data;
      }
    });

    billsScope.delete = function() {
      for(var i=0; i<billsScope.selected.length; i++)
      {
        var deleteBranch = requestService.getPromise("DELETE", FILES_DEPOT + "/" + billsScope.selected[i].id, null, userInfoService.user.authToken);
        deleteBranch.then(function (response) {
          toastServices.toastIt(response.status, "update_field");
          $log.log(response);
          if (response.status === 204) {
              billsScope.branches.splice(billsScope.branches.indexOf(billsScope.selected[i]), 1);
          }
        });
      }
      billsScope.selected = [];
    };

    billsScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function(newFile) {
          $log.log(newFile);
          billsScope.files.push(newFile);
        }, function () {});
    };

    billsScope.download = function() {
        $log.log("Downloading");
    };

    function checkIfUserHasPermissions(receiverId, senderId) {
      return ((userInfoService.user.id !== receiverId) && (userInfoService.user.id === senderId));
    }
  }
})();
