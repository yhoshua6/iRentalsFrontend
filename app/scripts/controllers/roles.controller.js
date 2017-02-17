/**
 * Created by jose- on 16/02/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("rolesCtrl", rolesCtrl);


  rolesCtrl.$inject = ["requestService", "userInfoService", "USER_ROLES"];
  function rolesCtrl(requestService, userInfoService, USER_ROLES) {
    var rolesScope = this;
    rolesScope.roles = [];
    rolesScope.selectedRole = "";
    var rolesPomise = requestService.getPromise("GET", USER_ROLES, null, userInfoService.user.authToken)
    rolesPomise.then(function (response) {
      rolesScope.roles = response.data;
    })
  }

})();
