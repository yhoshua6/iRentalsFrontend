(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("newFileCtrl", newFileCtrl);

  newFileCtrl.$inject = ["$mdDialog", "$log", "userInfoService", "toastServices", "Upload", "FILES_DEPOT"];
  function newFileCtrl($mdDialog, $log, userInfoService, toastServices, Upload, FILES_DEPOT) {
    var newFileScope = this;
    newFileScope.fileName = "";
    newFileScope.file = null;

    newFileScope.hide = function() {
      $mdDialog.hide();
    };

    newFileScope.cancel = function() {
      $mdDialog.cancel();
    };

    newFileScope.save = function(file, errFiles) {
      newFileScope.file = file;
      var newFile = {
        depot_file: {
          owner_id: userInfoService.user.currentBranch,
          file: file,
          file_name: newFileScope.fileName,
          originalName: file.name,
          location: userInfoService.user.branchLocation
        },
        file_name: newFileScope.fileName
      };
      file.upload = Upload.upload({
        url: FILES_DEPOT,
        data: newFile,
        headers: {
          "Authorization": userInfoService.user.authToken
        }
      });

      file.upload.then(function (response) {
        toastServices.toastIt(response.status, "file_upload");
        newFile.id = response.data.id;
        newFile.created_at = response.data.created_at;
        $mdDialog.hide(newFile);
      });
    };
  }
})();