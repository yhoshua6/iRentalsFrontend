/**
 * Created by jose- on 02/02/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("homeCtrl", homeCtrl);

  homeCtrl.$inject = ["$log", "userInfoService", "requestService", "NOTIFICATIONS"];
  function homeCtrl($log, userInfoService, requestService, NOTIFICATIONS) {
    var homeScope = this;

    var userNotifications = requestService.getPromise(
      "GET",
      NOTIFICATIONS + "/" + userInfoService.user.id,
      null,
      userInfoService.user.authToken
    );

    userNotifications.then(function (response) {
      if (response.status === 200) {
        $log.log(response);
        //billsScope.branches = response.data;
      }
    });

  }

})();
