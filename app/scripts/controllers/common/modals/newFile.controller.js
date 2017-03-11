(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("newFileCtrl", newFileCtrl);

  newFileCtrl.$inject = ["$mdDialog", "$log", "$base64", "userInfoService", "requestService", "FILES_DEPOT"];
  function newFileCtrl($mdDialog, $log, $base64, userInfoService, requestService, FILES_DEPOT) {
    var newFileScope = this;
    newFileScope.name = "";
    newFileScope.fileName = "";

    newFileScope.hide = function() {
      $mdDialog.hide();
    };

    newFileScope.cancel = function() {
      $mdDialog.cancel();
    };

    newFileScope.save = function() {
      var newFile = {
        depot_file: {
          owner_id: userInfoService.user.branch_id,
          file_name: newFileScope.fileName,
          file: newFileScope.file,
          path_file: 'files/bills/' + newFileScope.fileName
        }
      };
      $log.log(newFile);
      var filePromise = requestService.getPromise(
        "POST",
        FILES_DEPOT,
        requestService.formatData(newFile),
        userInfoService.user.authToken
      );

      filePromise.then(function (response) {
        if (response.status === 201) {
          $log.log(response);
          $mdDialog.hide(newFile);
        }
      });
    };
  }
})();
