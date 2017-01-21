/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("loginCtrl", loginCtrl);


  loginCtrl.$inject = ["$log", "requestService", "toastServices"];
  function loginCtrl($log, requestService, toastServices) {
    var loginScope = this;

    loginScope.authenticateUser = function(user, pwd) {
      var userToLogin = {
        "user": user,
        "password": pwd
      };
      var loginPromise = requestService.getLoginPromise(userToLogin);
      loginPromise.then(function (response) {
          toastServices.showSuccessfulLoggedIn();
        },
        function (error) {
          toastServices.showFailureLoggedIn();
      });
    };
  }

})();
