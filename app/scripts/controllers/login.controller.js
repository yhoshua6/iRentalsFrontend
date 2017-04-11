/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("loginCtrl", loginCtrl);


  loginCtrl.$inject = ["$state", "requestService", "toastServices", "crudService", "userInfoService", "LOGIN_ENDPOINT"];
  function loginCtrl($state, requestService, toastServices, crudService, userInfoService, LOGIN_ENDPOINT) {
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
            $state.go('root.home');
          }
        });
      loginScope.sending = !loginScope.sending;
    };

    loginScope.forgotPassword = function (event) {
      crudService.new("forgotPwdCtrl", "forgotPwdCtrl", "../../../views/modals/forgot_password.html", event)
        .then(function() {}, function () {});
    };

  }

})();
