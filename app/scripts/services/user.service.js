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


    userScope.setUserInfo = function (loggedInUser) {
      var userInfo = requestService.getUserInfoPromise(loggedInUser.authToken);
      userInfo.then(function (response) {
        userInfo = response;
        $log.log(response);
      }).catch(function (error) {
        $log.log(error);
      });
    };
  }
})();

