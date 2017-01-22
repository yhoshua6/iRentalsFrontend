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
    userScope.userInfo = {};


    userScope.setUserInfo = function (loggedInUser) {
      var userInfo = requestService.getUserInfoPromise(loggedInUser.authToken);
      userInfo.then(function (response) {
        data = response.data[0];
        userScope.userInfo = {
          id: data.userId,
          userName: data.firstName + " " + data.lastName,
          user: loggedInUser.user,
          authToken: loggedInUser.authToken
        };
        $log.log(userScope.userInfo);
      }).catch(function (error) {

        $log.log(error);
        userScope.userInfo = null;
      });
    };
  }
})();

