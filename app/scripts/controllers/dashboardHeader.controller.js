/**
 * Created by jose- on 19/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .controller('dashboardHeaderCtrl', dashboardHeaderCtrl);

  dashboardHeaderCtrl.$inject = ['$mdSidenav'];
  function dashboardHeaderCtrl($mdSidenav) {
    var dashHeaderScope = this;

    dashHeaderScope.toggleLeft = buildToggler('userProfile');
    dashHeaderScope.toggleRight = buildToggler('userNotifications');

    function buildToggler(componentId) {
      return function() { $mdSidenav(componentId).toggle(); }
    }

  }
})();
