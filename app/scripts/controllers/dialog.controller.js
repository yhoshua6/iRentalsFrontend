/**
 * Created by jose- on 14/01/2017.
 */
(function () {
  'use strict';

  angular.module('iRentalsApp')
    .controller('dialogCtrl', dialogCtrl);


  dialogCtrl.$inject = ['$mdDialog', 'requestService'];
  function dialogCtrl($mdDialog, requestService) {
    var dialogScope = this;
    dialogScope.user = '';
    dialogScope.userPwd = '';

    dialogScope.hide = function() {
      $mdDialog.hide();
    };

    dialogScope.cancel = function() {
      $mdDialog.cancel();
    };

    dialogScope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    dialogScope.makeRequest = function(user, pwd) {
      requestService.makeLoginRequest(user, pwd);
    }
  }
})();
