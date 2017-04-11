/**
 * Created by jose- on 3/11/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminGroupsCtrl", adminGroupsCtrl);


  adminGroupsCtrl.$inject = ["$mdSidenav", "crudService"];
  function adminGroupsCtrl($mdSidenav, crudService) {
    var groupsScope = this;
    groupsScope.selected = [];
    groupsScope.query = {
      order: 'title',
      limit: 4,
      page: 1
    };
    groupsScope.groups = [];

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    groupsScope.newBranch = function (event) {
      crudService.new("newGroupCtrl", "newGroupCtrl", "../../../views/dashboard/templates/new_group_modal.html", event)
        .then(function(newBranch) {
        }, function () {});
    };

  }
})();
