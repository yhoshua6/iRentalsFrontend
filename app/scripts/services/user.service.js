/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .service("userInfoService", userInfo);

  userInfo.$inject = ["requestService", "$log"];
  function userInfo (requestService, $log) {
    var userScope = this;
    userScope.user = {};


    userScope.setUserInfo = function (loggedInUser) {

      $log.log(loggedInUser);
    };
  }
})();

