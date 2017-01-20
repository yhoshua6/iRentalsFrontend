/**
 * Created by jose- on 18/01/2017.
 */
(function () {
  'use strict';

  angular.module("iRentalsApp")
    .directive("dashboardHeader", dashboardHeaderDirective);

  function dashboardHeaderDirective() {
    return {
      restrict: 'E',
      templateUrl: '../../views/directives/dashboard_header.html',
      controller: 'dashboardHeaderCtrl',
      controllerAs: 'dashHeader'
    }
  }
})();
