(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("vouchersCtrl", vouchersCtrl);

  vouchersCtrl.$inject = ["$mdSidenav"];
  function vouchersCtrl($mdSidenav) {
    var vouchersScope = this;
    vouchersScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }
  }
})();
