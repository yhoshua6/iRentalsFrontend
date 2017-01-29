/**
 * Created by jose- on 18/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ["$log", "$state", "gotUserInfo", "userInfoService"];
  function dashboardCtrl($log, $state, gotUserInfo, userInfoService) {
    //if (!gotUserInfo && !userInfoService.user.length > 0) { $state.go("root.login"); }
    var dashScope = this;
    dashScope.userName = userInfoService.user.name;
  }
})();
