(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("vouchersCtrl", vouchersCtrl);

  vouchersCtrl.$inject = ["$log", "$mdSidenav", "requestService", "userInfoService", "crudService", "FILES_DEPOT"];
  function vouchersCtrl($log, $mdSidenav, requestService, userInfoService, crudService, FILES_DEPOT) {
    var vouchersScope = this;
    vouchersScope.query = {
      order: 'title',
      limit: 4,
      page: 1
    };
    vouchersScope.files = [];
    vouchersScope.selected = [];
    vouchersScope.isSender = userInfoService.user.isSender;

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    var depotFilter = {
      depot_file: {
        owner_id: userInfoService.user.currentBranch
      }
    };

    var filesDepot = requestService.getPromise(
      "GET",
      FILES_DEPOT,
      requestService.formatData(depotFilter),
      userInfoService.user.authToken
    );

    filesDepot.then(function (response) {
      $log.log(response);
      if (response.status === 200) {
        vouchersScope.files = response.data;
      }
    });

    vouchersScope.delete = function() {
      vouchersScope.files = crudService.deleteFiles(vouchersScope.files, vouchersScope.selected);
      vouchersScope.selected = [];
    };

    vouchersScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function(newFile) {
          vouchersScope.files.push(newFile);
        }, function () {});
    };

    vouchersScope.download = function() {
      crudService.getFiles(vouchersScope.selected);
      vouchersScope.selected = [];
    };
  }
})();
