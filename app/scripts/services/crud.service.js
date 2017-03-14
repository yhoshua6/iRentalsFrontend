/**
 * Created by jose- on 3/10/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .service("crudService", crudService);

  crudService.$inject = ["$mdDialog", "$mdEditDialog"];
  function crudService ($mdDialog, $mdEditDialog) {
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


  }
})();
