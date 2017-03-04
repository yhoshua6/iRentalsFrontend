/**
 * Created by jose- on 02/02/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("homeCtrl", homeCtrl);

  homeCtrl.$inject = ["$log", "userInfoService", "requestService", "NOTIFICATIONS", "NOTIFICATIONS_ROLES"];
  function homeCtrl($log, userInfoService, requestService, NOTIFICATIONS, NOTIFICATIONS_ROLES) {
    var homeScope = this;
    homeScope.notifications = [];
    homeScope.userName = userInfoService.user.userName;

    var userRoleNotifications = requestService.getPromise(
      "GET",
      NOTIFICATIONS_ROLES,
      null,
      userInfoService.user.authToken
    );

    userRoleNotifications.then(function (response) {
      if (response.status === 200) {
        setNotifications(response.data);
      }
    });

    function setNotifications(notifications) {
      var notification;
      for (var i=0; i<notifications.length; i++) {
        notification = notifications[i];
        var userRoleNotifications = requestService.getPromise(
          "GET",
          NOTIFICATIONS + "/" + notification.notification_id,
          null,
          userInfoService.user.authToken
        );

        userRoleNotifications.then(function (response) {
          if (response.status === 200) {
            homeScope.notifications.push(response.data);
          }
        });
      }
    }
  }

})();
