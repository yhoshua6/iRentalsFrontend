(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("docsCtrl", docsCtrl);

  docsCtrl.$inject = ["$mdSidenav", "requestService", "userInfoService", "BRANCHES"];
  function docsCtrl($mdSidenav, requestService, userInfoService, BRANCHES) {
    var docsScope = this;
    docsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    docsScope.documents = [];
    docsScope.selected = [];
    var branch = { branch: { filter: "Documentos" } };

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
        docsScope.isSender = checkIfUserHasPermissions(response.data.receiver_id, response.data.sender_id);
      }
    });

    docsScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function(newBranch) {
        //branchesScope.branches.push(newBranch);
      }, function () {});
    };

    function checkIfUserHasPermissions(receiverId, senderId) {
      return ((userInfoService.user.id !== receiverId) && (userInfoService.user.id === senderId));
    }
  }
})();
