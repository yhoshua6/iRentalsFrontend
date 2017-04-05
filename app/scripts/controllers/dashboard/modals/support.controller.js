/**
 * Created by jose- on 3/31/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("supportCtrl", supportCtrl);

  supportCtrl.$inject = ["$log", "$mdDialog", "requestService", "userInfoService", "toastServices", "SUPPORT"];
  function supportCtrl($log, $mdDialog, requestService, userInfoService, toastServices, SUPPORT) {
    var supportScope = this;
    supportScope.name = '';
    supportScope.email = '';
    supportScope.comments = '';

    supportScope.askForHelp = function () {
      var data = {
        user: userInfoService.user
      };
      var supportPromise = requestService.getPromise("POST", SUPPORT, requestService.formatData(data), null);
      supportPromise.then(function (response) {
        $log.log(response);
        toastServices.toastIt(response.status, "email_sent");
      });
    };


    supportScope.send = function () {

    };

    supportScope.hide = function() {
      $mdDialog.hide();
    };

    supportScope.cancel = function() {
      $mdDialog.cancel();
    };

  }

})();
