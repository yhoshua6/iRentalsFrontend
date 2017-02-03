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
          if (response.data) {
            $log.log(response.data);
            userInfoService.user = {
              authToken: response.data.authToken,
              infoId: response.data.info_id,
              roleId: response.data.role_id,
              groupRoleId: response.data.group_role_id
            };
            $log.log(userInfoService.user);
            toastServices.showSuccessfulLoggedIn();
            $state.go('adminRoot.home');
          } else {
            toastServices.showFailureLoggedIn();
          }
        }).catch(function (error) {
          //server error
          toastServices.showFailureLoggedIn();
      });

      loginScope.sending = !loginScope.sending;
    };

  }

})();
