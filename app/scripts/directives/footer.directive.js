/**
 * Created by jose- on 28/01/2017.
 */
(function() {
  "use strict";

  angular.module("iRentalsApp")
    .directive("footer", footerDirective);

  function footerDirective() {
    return {
      restrict: "E",
      templateUrl: "../../views/directives/page_footer.html"
    };
  }
})();
