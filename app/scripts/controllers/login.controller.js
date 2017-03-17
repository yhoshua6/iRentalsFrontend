/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("loginCtrl", loginCtrl);


  loginCtrl.$inject = ["$log", "$state", "requestService", "toastServices", "userInfoService", "LOGIN_ENDPOINT", "SUCCESSFUL_LOGIN", "FAILURE_LOGIN", "SERVER_ERROR"];
  function loginCtrl($log, $state, requestService, toastServices, userInfoService, LOGIN_ENDPOINT, SUCCESSFUL_LOGIN, FAILURE_LOGIN, SERVER_ERROR) {
    var loginScope = this;
    loginScope.sending = false;
    loginScope.authenticateUser = function(user, pwd) {
      var userToLogin = {
        "user": user,
        "password": pwd
      };
      var toastOptions = {
        icon: "",
        message: ""
      };

      var loginPromise = requestService.getPromise("POST", LOGIN_ENDPOINT, requestService.formatData(userToLogin));
      loginPromise.then(function (response) {
          loginScope.sending = !loginScope.sending;
          switch (response.status) {
            case 200:
              userInfoService.setUserInfo(response);
              $log.log(userInfoService.user);
              toastOptions.icon = "verified_user";
              toastOptions.message = "Iniciaste sesion!"
              toastServices.toastIt(toastOptions);
              $state.go('root.home');
            break;
            case 401:
              toastOptions.icon = "error_outline";
              toastOptions.message = "Usuario/Contraseña invalidos"
              toastServices.toastIt(toastOptions);
            break;
            default:
              toastOptions.icon = "report_problem";
              toastOptions.message = "Revisa tu conexión de internet, si persiste el error contacta a los administradores."
              toastServices.toastIt(toastOptions);
            break;
          }
        });
      loginScope.sending = !loginScope.sending;
    };

  }

})();
