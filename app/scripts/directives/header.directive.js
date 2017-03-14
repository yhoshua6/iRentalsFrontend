/**
 * Created by jose- on 09/01/2017.
 */
(function() {
  "use strict";

  angular.module("iRentalsApp")
    .directive("pageHeader", headerDirective);

  function headerDirective() {
    return {
      restrict: "E",
      templateUrl: "../../views/directives/page_header.html",
      controller: "headerCtrl",
      controllerAs: "headerCtrl"
    };
  }
})();
