/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .service("userInfoService", userInfo);

  userInfo.$inject = ["$log", "requestService", "INFO_USER"];
  function userInfo ($log, requestService, INFO_USER) {
    var userScope = this;
    userScope.user = {};

    userScope.setUserInfo = function () {
      $log.log("hey");
      var INFO_USER = INFO_USER + "/" + userScope.user.infoId;
      var userPromise = requestService.getPromise("GET", INFO_USER, null, userScope.user.authToken);

      return userPromise.then(function (response) {
        var userInfo = response.data;
        userScope.user.id = userInfo.user_id;
        userScope.user.name = userInfo.name;
        userScope.user.bankAccount = userInfo.bank_account;
        userScope.user.bankClabe = userInfo.bank_clabe;
        userScope.user.bankName = userInfo.bank_name;
        userScope.user.cedula = userInfo.cedula;
        userScope.user.cellPhone = userInfo.cell_phone;
        userScope.user.isPartOfPool = userInfo.is_part_of_pool;
        userScope.user.paymentMethod = userInfo.payment_method;
        return true;
      }).catch(function (error) {
        return false;
      });
    };

  }
})();
