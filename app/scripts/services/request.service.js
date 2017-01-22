/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  'use strict';

  angular.module('iRentalsApp')
    .service('requestService', requestService);

  requestService.$inject = [
    '$http',
    'LOGIN_URL',
    'SEND_COMMENTS_TO_ADMIN',
    "GET_USER_INFO",
    "GET_USER_ROLE"
  ];
  function requestService ($http, LOGIN_URL, SEND_COMMENTS_TO_ADMIN, GET_USER_INFO, GET_USER_ROLE) {
    var requestScope = this;

    requestScope.getLoginPromise = function (userToLogin) {
      var userData = angular.toJson(userToLogin);
      return $http({
        method: "POST",
        url: LOGIN_URL,
        data: userData,
        headers: {
          "Content-Type": "application/json"
        }
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
    };

    requestScope.getUserInfoPromise = function (userAuthToken) {
      return $http({
        method: "GET",
        url: GET_USER_INFO,
        headers: {
          "Content-Type": "application/json",
          "Authorization": userAuthToken
        }
      });
    };

    requestScope.getUserRolePromise = function (userAuthToken, userRole) {
      $http({
        method: "GET",
        url: GET_USER_ROLE + "/" + userRole,
        headers: {
          "Content-Type": "application/json",
          "Authorization": userAuthToken
        }
      }).then(function (response) {
          return response.data;
        },
        function (error) {
          return error;
      });
    };
  }
})();
