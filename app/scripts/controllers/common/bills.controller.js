(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("billsCtrl", billsCtrl);

  billsCtrl.$inject = ["$mdSidenav", "userInfoService", "requestService", "crudService", "FILES_DEPOT"];
  function billsCtrl($mdSidenav, userInfoService, requestService, crudService, FILES_DEPOT) {
    var billsScope = this;
    billsScope.query = {
      order: 'title',
      limit: 4,
      page: 1
    };
    billsScope.files = [];
    billsScope.selected = [];
    billsScope.getFilesToPay = true;
    var branchIndex = userInfoService.getBranch('Facturas');
    billsScope.isSender = (branchIndex >= 0) ? userInfoService.user.branches[branchIndex].isSender : false;

    billsScope.isAdmin = function () {
      return userInfoService.user.role === "Administrador";
    };

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    if (branchIndex) {
      var depotFilter = {
        depot_file: {
          owner_id: userInfoService.user.branches[branchIndex].branchId
        }
      };

      var filesDepot = requestService.getPromise(
        "GET",
        FILES_DEPOT,
        requestService.formatData(depotFilter),
        userInfoService.user.authToken
      );

      filesDepot.then(function (response) {
        if (response.status === 200) {
          billsScope.files = response.data;
        }
      });
    }

    billsScope.delete = function () {
      billsScope.files = crudService.deleteFiles(billsScope.files, billsScope.selected);
      billsScope.selected = [];
    };

    billsScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function (newFile) {
          billsScope.files.push(newFile);
        }, function () {});
    };

    billsScope.download = function () {
      crudService.getFiles(billsScope.selected);
      billsScope.selected = [];
    };
  }
})();
