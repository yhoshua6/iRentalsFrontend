(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("docsCtrl", docsCtrl);

  docsCtrl.$inject = ["$mdDialog"];
  function docsCtrl($mdDialog) {
    var docsScope = this;
    docsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    docsScope.documents = [
      { id: 0, fileName: "upload.pdf", fileDate: "20-10-2017"},
      { id: 1, fileName: "upload1.pdf", fileDate: "22-10-2017"},
      { id: 2, fileName: "upload2.pdf", fileDate: "24-10-2017"},
      { id: 3, fileName: "upload3.pdf", fileDate: "27-10-2017"}
    ];
    docsScope.selected = [];

    docsScope.newFile = function (event) {
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
