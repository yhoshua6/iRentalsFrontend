/**
 * Created by jose- on 28/01/2017.
 */
(function() {
  "use strict";

  angular.module("iRentalsApp")
    .directive("footer", headerDirective);

  function headerDirective() {
    return {
      restrict: "E",
      templateUrl: "../../views/directives/footer.html"
    }
  }
})();
