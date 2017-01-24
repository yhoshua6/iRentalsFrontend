/**
 * Created by jose- on 18/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ["$log", "gotUserInfo"];
  function dashboardCtrl($log, gotUserInfo) {
    var dashScope = this;
    $log.log("--------------", gotUserInfo);
  }
})();
