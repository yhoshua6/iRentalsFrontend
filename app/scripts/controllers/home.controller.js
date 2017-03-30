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
    homeScope.notifications = [];
    homeScope.userName = userInfoService.user.userName;

    var userRoleNotifications = null;
    if(userInfoService.user.notificationRoles) {
      for(var i=0; i<userInfoService.user.notificationRoles.length; i++) {
        userRoleNotifications = requestService.getPromise(
          "GET",
          NOTIFICATIONS + "/" + userInfoService.user.notificationRoles[i].notification_id,
          null,
          userInfoService.user.authToken
        );

        userRoleNotifications.then(function (response) {
          if(response.status === 200 && response.data) {
            homeScope.notifications.push(response.data);
          }
        });
      }
    }
  }

})();
