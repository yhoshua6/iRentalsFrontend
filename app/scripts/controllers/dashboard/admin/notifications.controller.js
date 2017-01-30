/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("notificationsCtrl", notificationsCtrl);


  notificationsCtrl.$inject = ["$log", "$state"];
  function notificationsCtrl($log, $state) {
    //if (!isUserAlive) { $state.go("root.login"); }
    var notificationsScope = this;
    notificationsScope.notifications = [
      { title: "Something", toUser: "test", message: "lorem ipsum", image: "www.google.com" },
      { title: "Something", toUser: "test", message: "lorem ipsum", image: "www.google.com" },
      { title: "Something", toUser: "test", message: "lorem ipsum", image: "www.google.com" },
      { title: "Something", toUser: "test", message: "lorem ipsum", image: "www.google.com" }
    ];

    notificationsScope.deleteNotifications = function (propertyId) {
      $log.log("----------------", propertyId);
    };

    notificationsScope.doNothing = function () {
    };

  }
})();
