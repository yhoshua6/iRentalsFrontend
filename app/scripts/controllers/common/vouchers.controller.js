(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("vouchersCtrl", vouchersCtrl);

  vouchersCtrl.$inject = ["$mdSidenav", "requestService", "userInfoService", "crudService", "FILES_DEPOT"];
  function vouchersCtrl($mdSidenav, requestService, userInfoService, crudService, FILES_DEPOT) {
    var vouchersScope = this;
    vouchersScope.query = {
      order: 'title',
      limit: 4,
      page: 1
    };
    vouchersScope.files = [];
    vouchersScope.selected = [];
    var branchIndex = userInfoService.getBranch('Comprobantes');
    vouchersScope.isSender = (branchIndex >= 0) ? userInfoService.user.branches[branchIndex].isSender : false;

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    if (branchIndex >= 0) {
      userInfoService.setBranch(branchIndex);
      var filesDepot = requestService.getPromise(
        "GET",
        FILES_DEPOT + "?owner=" + userInfoService.user.branches[branchIndex].branchId,
        null,
        userInfoService.user.authToken
      );

      filesDepot.then(function (response) {
        if (response.status === 200) {
          vouchersScope.files = response.data.length > 1 ? response.data : [response.data];
        }
      });
    }


    vouchersScope.delete = function () {
      vouchersScope.files = crudService.deleteFiles(vouchersScope.files, vouchersScope.selected);
      vouchersScope.selected = [];
    };

    vouchersScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function (newFile) {
          vouchersScope.files.push(newFile);
        }, function () {});
    };

    vouchersScope.download = function () {
      crudService.getFiles(vouchersScope.selected);
      vouchersScope.selected = [];
    };
  }
})();
