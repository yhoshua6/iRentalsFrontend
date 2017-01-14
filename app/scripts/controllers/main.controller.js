(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name iRentalsFrontApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the iRentalsFrontApp
   */
  angular.module('iRentalsApp')
    .controller('MainCtrl', mainCtrl);

  mainCtrl.$inject = ["$log"];
  function mainCtrl($log) {
    var mainScope = this;

    mainScope.openModal = function() {
      $log.log("hola");

    };
  }
})();

