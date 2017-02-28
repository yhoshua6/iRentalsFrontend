(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("reportsCtrl", reportsCtrl);

  reportsCtrl.$inject = ["$mdDialog"];
  function reportsCtrl($mdDialog) {
    var reportsScope = this;
    reportsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    reportsScope.reports = [
      { id: 0, title: "hey", fileName: "upload.pdf", fileDate: "20-10-2017"},
      { id: 1, title: "hey 4", fileName: "upload2.pdf", fileDate: "20-10-2017"},
      { id: 2, title: "hey 3", fileName: "upload3.pdf", fileDate: "20-10-2017"},
      { id: 3, title: "hey 2", fileName: "upload4.pdf", fileDate: "20-10-2017"}
    ];
    reportsScope.selected = [];

    reportsScope.newFile = function (event) {
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
