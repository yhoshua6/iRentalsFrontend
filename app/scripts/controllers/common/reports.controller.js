(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("reportsCtrl", reportsCtrl);

  reportsCtrl.$inject = ["$mdDialog", "$mdSidenav"];
  function reportsCtrl($mdDialog, $mdSidenav) {
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

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    reportsScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function(newBranch) {
        //branchesScope.branches.push(newBranch);
      }, function () {});
    };
  }
})();
