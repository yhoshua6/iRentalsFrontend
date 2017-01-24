/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("loginCtrl", loginCtrl);


  loginCtrl.$inject = ["$log", "$state", "requestService", "toastServices", "userInfoService"];
  function loginCtrl($log, $state, requestService, toastServices, userInfoService) {
    var loginScope = this;
    loginScope.authenticateUser = function(user, pwd) {
      var userToLogin = {
        "user": user,
        "password": pwd
      };

      var loginPromise = requestService.getLoginPromise(userToLogin);
      loginPromise.then(function (response) {
          toastServices.showSuccessfulLoggedIn();
          userToLogin.authToken = response.data.authToken;
          userInfoService.user = { authToken: userToLogin.authToken };
          $state.go('dashboardRoot.home');
        }).catch(function (error) {
          toastServices.showFailureLoggedIn();
      });
    };

  }

})();
