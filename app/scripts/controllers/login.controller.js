/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("loginCtrl", loginCtrl);


  loginCtrl.$inject = ["$log", "$state", "requestService", "toastServices", "userInfoService", "LOGIN_ENDPOINT"];
  function loginCtrl($log, $state, requestService, toastServices, userInfoService, LOGIN_ENDPOINT) {
    var loginScope = this;
    loginScope.sending = false;
    loginScope.authenticateUser = function(user, pwd) {
      var userToLogin = {
        "user": user,
        "password": pwd
      };

      var loginPromise = requestService.getPromise("POST", LOGIN_ENDPOINT, requestService.formatData(userToLogin));
      loginPromise.then(function (response) {
          loginScope.sending = !loginScope.sending;
          toastServices.toastIt(response.status, "session");
          if (response.status === 200) {
            userInfoService.setUserInfo(response);
            $log.log(userInfoService.user);
            $state.go('root.home');
          }
        });
      loginScope.sending = !loginScope.sending;
    };

  }

})();
