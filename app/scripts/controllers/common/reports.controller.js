(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("reportsCtrl", reportsCtrl);

  reportsCtrl.$inject = ["$mdSidenav", "requestService", "userInfoService", "BRANCHES"];
  function reportsCtrl($mdSidenav, requestService, userInfoService, BRANCHES) {
    var reportsScope = this;
    reportsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    reportsScope.reports = [];
    reportsScope.selected = [];
    var branch = { branch: { filter: "Reportes" } };

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    var branchPromise = requestService.getPromise(
      "GET",
      BRANCHES + "/" + userInfoService.user.branchId,
      requestService.formatData(branch),
      userInfoService.user.authToken
    );

    branchPromise.then(function (response) {
      if (response.status === 200) {
        reportsScope.isSender = checkIfUserHasPermissions(response.data.receiver_id, response.data.sender_id);
      }
    });

    reportsScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function(newBranch) {
        //branchesScope.branches.push(newBranch);
      }, function () {});
    };
  }
})();
