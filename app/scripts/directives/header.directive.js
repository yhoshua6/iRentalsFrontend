/**
 * Created by jose- on 09/01/2017.
 */
(function() {
  'use strict';

  angular.module("iRentalsFrontApp")
    .directive("pageHeader", headerDirective);

  function headerDirective() {
    return {
      restrict: 'E',
      templateUrl: '../../views/directives/page_header.html',
      controller: 'headerCtrl',
      controllerAs: 'header'
    }
  }
})();
