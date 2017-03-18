(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("gatheringsCtrl", gatheringsCtrl);

  gatheringsCtrl.$inject = ["$mdSidenav", "requestService", "userInfoService", "BRANCHES"];
  function gatheringsCtrl($mdSidenav, requestService, userInfoService, BRANCHES) {
    var gatheringsScope = this;
    gatheringsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    gatheringsScope.users = [];
    gatheringsScope.documents = [];
    gatheringsScope.selected = [];
    var branch = { branch: { filter: "Asambleas" } };

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
        gatheringsScope.isSender = checkIfUserHasPermissions(response.data.receiver_id, response.data.sender_id);
      }
    });


    gatheringsScope.newFile = function (event) {
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
