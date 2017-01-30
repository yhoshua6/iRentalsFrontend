/**
 * Created by jose- on 29/01/2017.
 */
(function() {
  "use strict";

  angular.module("iRentalsApp")
    .directive("adminHeader", headerDirective);

  function headerDirective() {
    return {
      restrict: "E",
      templateUrl: "../../views/dashboard/admin/directives/dashboard_header.html",
      controller: "adminHeaderCtrl",
      controllerAs: "adminCtrl"
    }
  }
})();
