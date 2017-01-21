/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  'use strict';

  angular.module('iRentalsApp')
    .service('requestService', requestService);

  requestService.$inject = ['$log', '$http', 'LOGIN_URL', 'SEND_COMMENTS_TO_ADMIN'];
  function requestService ($log, $http, LOGIN_URL, SEND_COMMENTS_TO_ADMIN) {
    var requestScope = this;

    requestScope.makeLoginRequest = function (userToLogin) {
      var userData = angular.toJson(userToLogin);
      $http({
        method: "POST",
        url: LOGIN_URL,
        data: userData,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          $log.log(response.status, "----", response.statusText, "---", response.data.authToken);
        })
        .catch(function(err) {
          $log.log("Request Service: err=", err);
        });
    };

    requestScope.getCommentPromise = function (user) {
      var userData = angular.toJson(user);
      return $http({
        method: "POST",
        url: SEND_COMMENTS_TO_ADMIN,
        data: userData,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  }
})();
