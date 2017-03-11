/**
 * Created by jose- on 3/11/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminGroupsCtrl", adminGroupsCtrl);


  adminGroupsCtrl.$inject = ["$log", "$mdSidenav", "$mdEditDialog", "$mdDialog", "requestService", "userInfoService", "GROUP_USERS"];
  function adminGroupsCtrl($log,$mdSidenav, $mdEditDialog, $mdDialog, requestService, userInfoService, GROUP_USERS) {
    var groupsScope = this;
    groupsScope.selected = [];
    groupsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    groupsScope.groups = [];

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    groupsScope.newBranch = function (event) {
      $mdDialog.show({
        controller: "newGroupCtrl",
        controllerAs: "newGroupCtrl",
        templateUrl: "../../../views/dashboard/templates/new_group_modal.html",
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true
      }).then(function(newGroup) {

        $log.log(newGroup);

      }, function () {});
    };

  }
})();
