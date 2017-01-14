/**
 * Created by jose- on 14/01/2017.
 */
(function () {
  'use strict';

  angular.module('iRentalsApp')
    .controller('dialogCtrl', dialogCtrl);


  dialogCtrl.$inject = ['$mdDialog'];

  function dialogCtrl($mdDialog) {
    var dialogScope = this;
    dialogScope.hide = function() {
      $mdDialog.hide();
    };

    dialogScope.cancel = function() {
      $mdDialog.cancel();
    };

    dialogScope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
})();
