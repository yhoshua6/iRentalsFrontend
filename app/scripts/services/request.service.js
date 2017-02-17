/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .service("requestService", requestService);

  requestService.$inject = ["$q", "$http"];
  function requestService ($q, $http) {
    var requestScope = this;

    requestScope.getPromise = function (requestType, endpoint, formattedData, userAuthToken) {
      userAuthToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNzYwNTFhOTYtOTAwNS00Njc2LWExNzItYzc5YmQyMzY5NDEwIiwiZXhwIjoxNDg3NjUwMzAyLCJpc3MiOiJpc3N1ZXJfbmFtZSIsImF1ZCI6ImNsaWVudCJ9.-WcvN7UYPrxWvuVa50VRyRJ2upotFdqhwp-AcsBIXdA";
      var requestInfo = {
        method: requestType,
        url: endpoint
      };

      if (formattedData) {
        requestInfo.data = formattedData;
      }

      if (userAuthToken) {
        requestInfo.headers = {
          "Content-Type": "application/json",
          "Authorization": userAuthToken
        }
      }

      return promiseCreator(getRequest(requestInfo));
    };

    requestScope.formatData = function (rawData) {
      return angular.toJson(rawData);
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

    function getRequest(httpInfo) {
      return $http(httpInfo);
    }

  }
})();
