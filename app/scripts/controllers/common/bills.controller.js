(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("billsCtrl", billsCtrl);

  billsCtrl.$inject = ["$mdDialog", "$log", "userInfoService", "requestService", "BRANCHES"];
  function billsCtrl($mdDialog, $log, userInfoService, requestService, BRANCHES) {
    var billsScope = this;
    billsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    billsScope.branches = [];

    var branchesPromise = requestService.getPromise("GET", BRANCHES, null, userInfoService.user.authToken);
    branchesPromise.then(function (response) {
      if (response.status === 200) {
        $log.log(response);
        //billsScope.branches = response.data;
      }
    });

    billsScope.bills = [
      { id: 0, title: "hey", propertyName: "testing this", propertyType: "Local", name: "testGuy", fileName: "upload.pdf", fileDate: "20-10-2017"},
      { id: 1, title: "hey 1", propertyName: "testing this 1", propertyType: "Local", name: "testGuy", fileName: "upload.pdf", fileDate: "20-10-2017"},
      { id: 2, title: "hey 2", propertyName: "testing this 2", propertyType: "Local", name: "testGuy", fileName: "upload.pdf", fileDate: "20-10-2017"},
      { id: 3, title: "hey 3", propertyName: "testing this 3", propertyType: "Local", name: "testGuy", fileName: "upload.pdf", fileDate: "20-10-2017"},
      { id: 4, title: "hey 4", propertyName: "testing this 4", propertyType: "Local", name: "testGuy", fileName: "upload.pdf", fileDate: "20-10-2017"}
    ];
    billsScope.selected = [];

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
