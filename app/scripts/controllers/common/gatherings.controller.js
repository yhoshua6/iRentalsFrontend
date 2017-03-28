(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("gatheringsCtrl", gatheringsCtrl);

  gatheringsCtrl.$inject = ["$log", "$mdSidenav", "requestService", "userInfoService", "crudService", "FILES_DEPOT"];
  function gatheringsCtrl($log, $mdSidenav, requestService, userInfoService, crudService, FILES_DEPOT) {
    var gatheringsScope = this;
    gatheringsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    gatheringsScope.files = [];
    gatheringsScope.selected = [];
    gatheringsScope.isSender = userInfoService.user.isSender;

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
        gatheringsScope.files = response.data;
      }
    });

    gatheringsScope.delete = function() {
      gatheringsScope.files = crudService.deleteFiles(gatheringsScope.files, gatheringsScope.selected);
      gatheringsScope.selected = [];
    };

    gatheringsScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function(newFile) {
          $log.log(newFile);
          gatheringsScope.files.push(newFile);
        }, function () {});
    };

    gatheringsScope.download = function() {
      crudService.getFiles(gatheringsScope.selected);
      gatheringsScope.selected = [];
    };
  }
})();
