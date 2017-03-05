(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("vouchersCtrl", vouchersCtrl);

  vouchersCtrl.$inject = [];
  function vouchersCtrl() {
    var vouchersScope = this;
    vouchersScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
  }
})();
