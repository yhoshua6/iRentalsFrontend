/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminGroupsCtrl", adminGroupsCtrl);


  adminGroupsCtrl.$inject = ["$log", "$state"];
  function adminGroupsCtrl($log, $state) {
    //if (!isUserAlive) { $state.go("root.login"); }
    var groupsScope = this;
    groupsScope.groups = [
      { id: "0", name: "group 1", url: "www.google.com", edit: false },
      { id: "1", name: "group 2", url: "www.google.com", edit: false },
      { id: "2", name: "group 3", url: "www.google.com", edit: false },
      { id: "3", name: "group 4", url: "www.google.com", edit: false }
    ];

    groupsScope.deleteGroup = function (groupId) {
      $log.log("----------------", groupId);
    };

    groupsScope.doNothing = function () {

    };

  }
})();
