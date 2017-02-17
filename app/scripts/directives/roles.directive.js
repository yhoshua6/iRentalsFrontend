/**
 * Created by jose- on 16/02/2017.
 */
(function() {
  "use strict";

  angular.module("iRentalsApp")
    .directive("userRoles", rolesDirective);

  function rolesDirective() {
    return {
      restrict: "E",
      templateUrl: "../../views/directives/user_roles.html",
      controller: "rolesCtrl",
      controllerAs: "rolesCtrl"
    }
  }
})();
