/**
 * Created by jose- on 09/01/2017.
 */
(function() {
  'use strict';

  angular.module("iRentalsApp")
    .controller("headerCtrl", headerCtrl);

  headerCtrl.$inject = ["$state", "$log", "$location", "$mdDialog"];

  function headerCtrl($state, $log, $location, $mdDialog) {
    var headerScope = this;

    headerScope.showModal = function(ev) {
      $mdDialog.show({
        controller: "dialogCtrl",
        controllerAs: 'dialog',
        templateUrl: '../../views/modals/login_modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true // Only for -xs, -sm breakpoints.
      });
    };

    headerScope.hideLoginModal = function() {
    };
  }
})();


/*
 .then(function(answer) {
 $scope.status = 'You said the information was "' + answer + '".';
 }, function() {
 $scope.status = 'You cancelled the dialog.';
 });
 */
