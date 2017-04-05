(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("docsCtrl", docsCtrl);

  docsCtrl.$inject = ["$mdSidenav", "requestService", "userInfoService", "crudService", "FILES_DEPOT"];
  function docsCtrl($mdSidenav, requestService, userInfoService, crudService, FILES_DEPOT) {
    var docsScope = this;
    docsScope.query = {
      order: 'title',
      limit: 4,
      page: 1
    };
    docsScope.files = [];
    docsScope.selected = [];
    var branchIndex = userInfoService.getBranch('Documentos');
    docsScope.isSender = (branchIndex >= 0) ? userInfoService.user.branches[branchIndex].isSender : false;

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
          docsScope.files = response.data;
        }
      });
    }

    docsScope.delete = function () {
      docsScope.files = crudService.deleteFiles(docsScope.files, docsScope.selected);
      docsScope.selected = [];
    };

    docsScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function (newFile) {
          docsScope.files.push(newFile);
        }, function () {});
    };

    docsScope.download = function () {
      crudService.getFiles(docsScope.selected);
      docsScope.selected = [];
    };
  }
})();
