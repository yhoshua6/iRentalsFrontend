/**
 * Created by jose- on 09/01/2017.
 */
(function() {
  'use strict';

  angular.module("iRentalsFrontApp")
    .controller("headerCtrl", headerCtrl);

  headerCtrl.$inject = ["$state", "$log", "$location", "$mdDialog"];

  function headerCtrl($state, $log, $location, $mdDialog) {
    var headerScope = this;

    headerScope.showTabDialog = function(ev) {
      $log.log(ev);
      $mdDialog.show({
        controller: '',
        templateUrl: '../../views/modals/login_modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };

    headerScope.hideLoginModal = function() {
    };
  }
})();
