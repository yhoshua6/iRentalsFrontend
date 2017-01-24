/**
 * Created by jose- on 23/01/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("reportsCtrl", reportsCtrl);


  reportsCtrl.$inject = ["$state", "isUserAlive"];
  function reportsCtrl($state, isUserAlive) {
    if (!isUserAlive) { $state.go("root.login"); }
  }
})();
