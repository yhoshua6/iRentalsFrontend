/**
 * Created by jose- on 21/01/2017.
 */
(function(){
  'use strict';

  angular.module("iRentalsApp")
    .controller("billsCtrl", billsCtrl);

  billsCtrl.$inject = ["$log", "$q", "$state", "isUserAlive"];
  function billsCtrl($log, $q, $state, isUserAlive) {
    if (!isUserAlive) { $state.go("root.login"); }
    var billScope = this;
  }
})();
