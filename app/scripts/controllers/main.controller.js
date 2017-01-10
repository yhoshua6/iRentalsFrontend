(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name iRentalsFrontApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the iRentalsFrontApp
   */
  angular.module('iRentalsFrontApp')
    .controller('MainCtrl', mainCtrl);

  function mainCtrl() {
    var mainScope = this;

    mainScope.showLoginModal = function(){
      //angular.element('#ordersModal').openModal();
    };

    mainScope.hideLoginModal = function() {
      //angular.element('#ordersModal').closeModal();
    };
  }
})();

