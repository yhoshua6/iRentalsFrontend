/**
 * Created by jose- on 3/10/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .service("crudService", crudService);

  crudService.$inject = ["$log", "$mdDialog", "$mdEditDialog", "userInfoService", "requestService", "toastServices", "FILES_DEPOT"];
  function crudService ($log, $mdDialog, $mdEditDialog, userInfoService, requestService, toastServices, FILES_DEPOT) {
    var crudScope = this;

    crudScope.new = function (controller, controllerAs, templateUrl, event) {
      return $mdDialog.show({
        controller: controller,
        controllerAs: controllerAs,
        templateUrl: templateUrl,
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true
      });
    };

    crudScope.edit = function (event, fieldNumber, branch, dialogOptions) {
      event.stopPropagation();
      var promise = $mdEditDialog.small(dialogOptions);
      promise.then(function (ctrl) {
        var input = ctrl.getInput();
        input.$viewChangeListeners.push(function () {
          input.$setValidity('test', input.$modelValue !== 'test');
        });
      });
    };

    crudScope.deleteFiles = function (files, selected) {
      for(var i=0; i<selected.length; i++)
      {
        var indexItem = files.indexOf(selected[i]);
        var deleteBranch = requestService.getPromise("DELETE", FILES_DEPOT + "/" + selected[i].id, null, userInfoService.user.authToken);
        deleteBranch.then(function (response) {
          toastServices.toastIt(response.status, "file_upload");
          if (response.status === 204) {
            files.splice(indexItem, 1);
          }
        });
      }
      return files;
    };

    crudScope.getFiles = function (selected) {
      for(var i=0; i<selected.length; i++)
      {
        var downloadFile = requestService.getPromise("GET", FILES_DEPOT + "/" + selected[i].id, null, userInfoService.user.authToken);
        downloadFile.then(function (response) {
          $log.log(response);
          toastServices.toastIt(response.status, "file_get");
        });
      }
    };

  }
})();
