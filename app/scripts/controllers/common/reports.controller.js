(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("reportsCtrl", reportsCtrl);

  reportsCtrl.$inject = ["$mdSidenav", "requestService", "userInfoService", "crudService", "FILES_DEPOT"];
  function reportsCtrl($mdSidenav, requestService, userInfoService, crudService, FILES_DEPOT) {
    var reportsScope = this;
    reportsScope.query = {
      order: 'title',
      limit: 4,
      page: 1
    };
    reportsScope.files = [];
    reportsScope.selected = [];
    var branchIndex = userInfoService.getBranch('Reportes');
    reportsScope.isSender = (branchIndex >= 0) ? userInfoService.user.branches[branchIndex].isSender : false;

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    if (branchIndex >= 0) {
      userInfoService.setBranch(branchIndex);
      var filesDepot = requestService.getPromise(
        "GET",
        FILES_DEPOT + "/" + userInfoService.user.branches[branchIndex].branchId,
        null,
        userInfoService.user.authToken
      );

      filesDepot.then(function (response) {
        if (response.status === 200) {
          reportsScope.files = response.data;
        }
      });
    }

    reportsScope.delete = function () {
      reportsScope.files = crudService.deleteFiles(reportsScope.files, reportsScope.selected);
      reportsScope.selected = [];
    };

    reportsScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function (newFile) {
          reportsScope.files.push(newFile);
        }, function () {});
    };

    reportsScope.download = function () {
      crudService.getFiles(reportsScope.selected);
      reportsScope.selected = [];
    };
  }
})();
