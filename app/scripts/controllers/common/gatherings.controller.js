(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("gatheringsCtrl", gatheringsCtrl);

  gatheringsCtrl.$inject = ["$mdSidenav", "requestService", "userInfoService", "crudService", "FILES_DEPOT"];
  function gatheringsCtrl($mdSidenav, requestService, userInfoService, crudService, FILES_DEPOT) {
    var gatheringsScope = this;
    gatheringsScope.query = {
      order: 'title',
      limit: 4,
      page: 1
    };
    gatheringsScope.files = [];
    gatheringsScope.selected = [];
    var branchIndex = userInfoService.getBranch('Asambleas');
    gatheringsScope.isSender = (branchIndex >= 0) ? userInfoService.user.branches[branchIndex].isSender : false;

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
          gatheringsScope.files = response.data;
        }
      });
    }

    gatheringsScope.delete = function () {
      gatheringsScope.files = crudService.deleteFiles(gatheringsScope.files, gatheringsScope.selected);
      gatheringsScope.selected = [];
    };

    gatheringsScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function (newFile) {
          gatheringsScope.files.push(newFile);
        }, function () {});
    };

    gatheringsScope.download = function () {
      crudService.getFiles(gatheringsScope.selected);
      gatheringsScope.selected = [];
    };
  }
})();
