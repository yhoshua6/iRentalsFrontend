/**
 * Created by jose- on 3/31/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("supportCtrl", supportCtrl);

  supportCtrl.$inject = ["$log", "$mdDialog"];
  function supportCtrl($log, $mdDialog) {
    var supportScope = this;
    supportScope.name = '';
    supportScope.email = '';
    supportScope.comments = '';


    supportScope.send = function () {

    };

    supportScope.hide = function() {
      $mdDialog.hide();
    };

    supportScope.cancel = function() {
      $mdDialog.cancel();
    };

  }

})();
