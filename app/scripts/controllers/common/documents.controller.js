(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("docsCtrl", docsCtrl);

  docsCtrl.$inject = ["$log", "$mdSidenav", "requestService", "userInfoService", "crudService", "FILES_DEPOT"];
  function docsCtrl($log, $mdSidenav, requestService, userInfoService, crudService, FILES_DEPOT) {
    var docsScope = this;
    docsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    docsScope.files = [];
    docsScope.selected = [];
    docsScope.isSender = userInfoService.user.isSender;

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }
<<<<<<< HEAD

=======
    
>>>>>>> dc36d94ed834b5cc2621d1f000921e44fdd28fee
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
        docsScope.files = response.data;
      }
    });

    docsScope.delete = function() {
      docsScope.files = crudService.deleteFiles(docsScope.files, docsScope.selected);
      docsScope.selected = [];
    };

    docsScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function(newFile) {
          $log.log(newFile);
          docsScope.files.push(newFile);
        }, function () {});
    };

    docsScope.download = function() {
      crudService.getFiles(docsScope.selected);
      docsScope.selected = [];
    };
  }
})();
