/**
 * Created by jose- on 04/02/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("modalCtrl", modalCtrl);


  modalCtrl.$inject = ["$mdDialog"];
  function modalCtrl($mdDialog) {
    var modalScope = this;

    modalScope.hide = function() {
      $mdDialog.hide();
    };

    modalScope.cancel = function() {
      $mdDialog.cancel();
    };

    modalScope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

})();
