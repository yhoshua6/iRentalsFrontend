(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("billsCtrl", billsCtrl);

  billsCtrl.$inject = ["$mdDialog", "$log", "userInfoService", "requestService", "BRANCHES", "BRANCHES_ROLES"];
  function billsCtrl($mdDialog, $log, userInfoService, requestService, BRANCHES, BRANCHES_ROLES) {
    var billsScope = this;
    billsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    billsScope.bills = [];
    billsScope.selected = [];

    var branchesRolesPromise = requestService.getPromise(
      "GET",
      BRANCHES_ROLES + "/" + userInfoService.user.branchRoleId,
      null,
      userInfoService.user.authToken
    );
    
    branchesRolesPromise.then(function (response) {
      if (response.status === 200) {
        $log.log(response);
        //billsScope.branches = response.data;
      }
    });

    var branchesPromise = requestService.getPromise("GET", BRANCHES, null, userInfoService.user.authToken);
    branchesPromise.then(function (response) {
      if (response.status === 200) {
        $log.log(response);
        //billsScope.branches = response.data;
      }
    });

    billsScope.newFile = function (event) {
      $mdDialog.show({
        controller: "newFileCtrl",
        controllerAs: "newFileCtrl",
        templateUrl: "../../../../views/dashboard/common/modals/upload_file.html",
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true
      }).then(function(newBranch) {
        //branchesScope.branches.push(newBranch);
      }, function () {});
    };
  }
})();
