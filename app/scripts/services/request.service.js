/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  'use strict';

  angular.module('iRentalsApp')
    .service('requestService', requestService);

  requestService.$inject = ['$log', '$http', 'LOGIN_URL_DEV', 'PROPERTIES_URL_DEV'];
  function requestService ($log, $http, LOGIN_URL_DEV, PROPERTIES_URL_DEV) {
    var requestScope = this;

    requestScope.makeLoginRequest = function (user, pwd) {
      var userToLogin = {
        "user": user,
        "password": pwd
      };
      var userData = angular.toJson(userToLogin);
      var httpPromise = $http({
        method: "POST",
        url: LOGIN_URL_DEV,
        data: userData,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          $log.log(response);
        })
        .catch(function(err) {
          $log.log("Request Service: err=", err);
        });
    };
  }

})();
