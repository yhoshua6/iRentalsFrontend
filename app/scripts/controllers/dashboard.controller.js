/**
 * Created by jose- on 18/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ["$log", "$state", "gotUserInfo"];
  function dashboardCtrl($log, $state, gotUserInfo) {
    if (!gotUserInfo) { $state.go("root.login"); }
    var dashScope = this;
  }
})();
