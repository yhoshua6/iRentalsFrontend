(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("newFileCtrl", newFileCtrl);

  newFileCtrl.$inject = ["$mdDialog", "$log", "userInfoService", "requestService", "Upload", "FILES_DEPOT"];
  function newFileCtrl($mdDialog, $log, userInfoService, requestService, Upload, FILES_DEPOT) {
    var newFileScope = this;
    newFileScope.name = "";
    newFileScope.file = null;

    newFileScope.hide = function() {
      $mdDialog.hide();
    };

    newFileScope.cancel = function() {
      $mdDialog.cancel();
    };

    newFileScope.save = function(file, errFiles) {
      newFileScope.file = file;
      if (file) {
        var newFile = {
          depot_file: {
            owner_id: userInfoService.user.branchId,
            file: file,
            file_name: file.name
          }
        };
        $log.log(newFile);
        file.upload = Upload.upload({
          url: FILES_DEPOT,
          data: newFile,
          headers: {
            "Authorization": userInfoService.user.authToken
          }
        });
      }
    };

    /*
     $scope.f = file;
     $scope.errFile = errFiles && errFiles[0];
     if (file) {
     file.upload = Upload.upload({
     url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
     data: {file: file}
     });

     file.upload.then(function (response) {
     $timeout(function () {
     file.result = response.data;
     });
     }, function (response) {
     if (response.status > 0)
     $scope.errorMsg = response.status + ': ' + response.data;
     }, function (evt) {
     file.progress = Math.min(100, parseInt(100.0 *
     evt.loaded / evt.total));
     });
     }
     }
     */

    /*
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
     */
  }
})();
