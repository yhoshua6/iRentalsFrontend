/**
 * Created by jose- on 21/01/2017.
 */
(function(){
  'use strict';

  angular.module("iRentalsApp")
    .controller("billsCtrl", billsCtrl);

  billsCtrl.$inject = ["$log", "$q", "$state", "userInfoService"];
  function billsCtrl($log, $q, $state, userInfoService) {
    //if (!userInfoService.user.length > 0) { $state.go("root.login"); }
    var billScope = this;
  }
})();
