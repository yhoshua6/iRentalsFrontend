(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("vouchersCtrl", vouchersCtrl);

  vouchersCtrl.$inject = ["$mdSidenav", "requestService", "userInfoService", "BRANCHES"];
  function vouchersCtrl($mdSidenav, requestService, userInfoService, BRANCHES) {
    var vouchersScope = this;
    vouchersScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    var branch = { branch: { filter: "Comprobantes" } };

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
        vouchersScope.isSender = checkIfUserHasPermissions(response.data.receiver_id, response.data.sender_id);
      }
    });

    function checkIfUserHasPermissions(receiverId, senderId) {
      return ((userInfoService.user.id !== receiverId) && (userInfoService.user.id === senderId));
    }
  }
})();
