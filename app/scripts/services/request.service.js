/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  'use strict';

  angular.module('iRentalsApp')
    .service('requestService', requestService);

  requestService.$inject = [
    '$q',
    '$http',
    'LOGIN_URL',
    'SEND_COMMENTS_TO_ADMIN',
    "GET_USER_INFO",
    "GET_USER_ROLE",
    "GET_FILES_DEPOT"
  ];
  function requestService ($q, $http, LOGIN_URL, SEND_COMMENTS_TO_ADMIN, GET_USER_INFO, GET_USER_ROLE, GET_FILES_DEPOT) {
    var requestScope = this;

    requestScope.getLoginPromise = function (userToLogin) {
      var userData = angular.toJson(userToLogin);
      var httpPromise = $http({
        method: "POST",
        url: LOGIN_URL,
        data: userData,
        headers: {
          "Content-Type": "application/json"
        }
      });

      return promiseCreator(httpPromise);
    };

    requestScope.getCommentPromise = function (user) {
      var userData = angular.toJson(user);
      var httpPromise = $http({
        method: "POST",
        url: SEND_COMMENTS_TO_ADMIN,
        data: userData,
        headers: {
          "Content-Type": "application/json"
        }
      });

      return promiseCreator(httpPromise);
    };

    requestScope.getUserInfoPromise = function (userAuthToken) {
      var httpPromise = $http({
        method: "GET",
        url: GET_USER_INFO,
        headers: {
          "Content-Type": "application/json",
          "Authorization": userAuthToken
        }
      });

      return promiseCreator(httpPromise);
    };

    requestScope.getUserRolePromise = function (userAuthToken, userRole) {
      var httpPromise = $http({
        method: "GET",
        url: GET_USER_ROLE + "/" + userRole,
        headers: {
          "Content-Type": "application/json",
          "Authorization": userAuthToken
        }
      });

      return promiseCreator(httpPromise);
    };

    requestScope.getLastFiveNotifications = function (userAuthToken) {
      var httpPromise = $http({
        method: "GET",
        url: GET_FILES_DEPOT,
        headers: {
          "Content-Type": "application/json",
          "Authorization": userAuthToken
        }
      });

      return promiseCreator(httpPromise);
    };

    function promiseCreator (httpPromise) {
      var defer = $q.defer();
      httpPromise.then(function (response) {
        defer.resolve(response);
      }, function (error) {
        defer.resolve(error);
      });

      return defer.promise;
    }
  }
})();
