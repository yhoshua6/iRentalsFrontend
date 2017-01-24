/**
 * Created by jose- on 23/01/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("reportsCtrl", reportsCtrl);


  reportsCtrl.$inject = ["$state", "userInfoService"];
  function reportsCtrl($state, userInfoService) {
    //if (!userInfoService.user.length > 0) { $state.go("root.login"); }
  }
})();
