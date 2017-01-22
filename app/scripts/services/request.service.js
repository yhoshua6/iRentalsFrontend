/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  'use strict';

  angular.module('iRentalsApp')
    .service('requestService', requestService);

  requestService.$inject = [
    "$q",
    '$http',
    'LOGIN_URL',
    'SEND_COMMENTS_TO_ADMIN',
    "GET_USER_INFO",
    "GET_USER_ROLE"
  ];
  function requestService ($q, $http, LOGIN_URL, SEND_COMMENTS_TO_ADMIN, GET_USER_INFO, GET_USER_ROLE) {
    var requestScope = this;
    requestScope.deferred = $q.defer();

    requestScope.getLoginPromise = function (userToLogin) {
      var userData = angular.toJson(userToLogin);
      $http({
        method: "POST",
        url: LOGIN_URL,
        data: userData,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (response) {
          requestScope.deferred.resolve(response);
        }, function (error) {
        requestScope.deferred.reject(error);
      });

      return requestScope.deferred.promise;
    };

    requestScope.getCommentPromise = function (user) {
      var userData = angular.toJson(user);
      $http({
        method: "POST",
        url: SEND_COMMENTS_TO_ADMIN,
        data: userData,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        requestScope.deferred.resolve(response);
      }, function (error) {
        requestScope.deferred.reject(error);
      });

      return requestScope.deferred.promise;
    };

    requestScope.getUserInfoPromise = function (userAuthToken) {
      $http({
        method: "GET",
        url: GET_USER_INFO,
        headers: {
          "Content-Type": "application/json",
          "Authorization": userAuthToken
        }
      }).then(function (response) {
        requestScope.deferred.resolve(response);
      }, function (error) {
        requestScope.deferred.reject(error);
      });

      return requestScope.deferred.promise;
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
        requestScope.deferred.resolve(response);
      }, function (error) {
        requestScope.deferred.reject(error);
      });

      return requestScope.deferred.promise;
    };
  }
})();
