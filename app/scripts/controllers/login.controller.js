/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  'use strict';

  angular.module('iRentalsApp')
    .controller('loginCtrl', loginCtrl);


  loginCtrl.$inject = ['$log', 'requestService', 'toastServices'];
  function loginCtrl($log, requestService, toastServices) {
    var loginScope = this;

    loginScope.loginRequest = function(user, pwd) {
      var userToLogin = {
        "user": user,
        "password": pwd
      };
      requestService.makeLoginRequest(userToLogin);
      toastServices.showSimpleToast()
    };
  }

})();
