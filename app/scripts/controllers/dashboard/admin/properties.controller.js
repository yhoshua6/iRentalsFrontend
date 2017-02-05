/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminPropertiesCtrl", adminPropertiesCtrl);


  adminPropertiesCtrl.$inject = ["$log", "$mdDialog", "$mdEditDialog"];
  function adminPropertiesCtrl($log, $mdDialog, $mdEditDialog) {
    var propertiesScope = this;
    //if (!isUserAlive) { $state.go("root.login"); }
    propertiesScope.selected = [];
    propertiesScope.query = {
      order: 'group_name',
      limit: 5,
      page: 1
    };
    propertiesScope.properties = [
      { id: 0, name: "someName", description: "alsjkdlaskd", active: true, surfaceTotal: 100, surfaceIn: 1.02, surfaceOut: 2.320 },
      { id: 1, name: "someName", description: "alsjkdlaskd", active: true, surfaceTotal: 100, surfaceIn: 1.02, surfaceOut: 2.320 },
      { id: 2, name: "someName", description: "alsjkdlaskd", active: true, surfaceTotal: 100, surfaceIn: 1.02, surfaceOut: 2.320 },
      { id: 3, name: "someName", description: "alsjkdlaskd", active: true, surfaceTotal: 100, surfaceIn: 1.02, surfaceOut: 2.320 },
      { id: 4, name: "someName", description: "alsjkdlaskd", active: true, surfaceTotal: 100, surfaceIn: 1.02, surfaceOut: 2.320 },
      { id: 5, name: "someName", description: "alsjkdlaskd", active: true, surfaceTotal: 100, surfaceIn: 1.02, surfaceOut: 2.320 },
      { id: 6, name: "someName", description: "alsjkdlaskd", active: true, surfaceTotal: 100, surfaceIn: 1.02, surfaceOut: 2.320 },
      { id: 7, name: "someName", description: "alsjkdlaskd", active: true, surfaceTotal: 100, surfaceIn: 1.02, surfaceOut: 2.320 },
      { id: 8, name: "someName", description: "alsjkdlaskd", active: true, surfaceTotal: 100, surfaceIn: 1.02, surfaceOut: 2.320 }
    ];

    propertiesScope.deleteProperties = function () {
      $log.log(propertiesScope.selected, "////");

    };

    propertiesScope.modifyField = function (event,fieldNumber, user) {
      event.stopPropagation();
      var promise = $mdEditDialog.small(getDialogOptions(fieldNumber, user));
      promise.then(function (ctrl) {
        var input = ctrl.getInput();
        input.$viewChangeListeners.push(function () {
          input.$setValidity('test', input.$modelValue !== 'test');
        });
      });
    };


    propertiesScope.newProperty = function (event) {
      $mdDialog.show({
        //controller: "newGroupCtrl",
        //controllerAs: "newGroupCtrl",
        templateUrl: "../../../../views/dashboard/admin/templates/new_property_modal.html",
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true
      })
        .then(function(answer) {
          //$scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          //$scope.status = 'You cancelled the dialog.';
        });
    };

    function getDialogOptions(option, user) {
      var dialogOption = null;
      switch (option) {
        case 1:
          dialogOption = {
            modelValue: user.name,
            placeholder: 'Cambia el nombre de la propiedad.',
            save: function (input) {
              $log.log("Updating.....");
              user.name = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
        case 2:
          dialogOption = {
            modelValue: user.description,
            placeholder: 'Cambia la descripción de la propiedad.',
            save: function (input) {
              $log.log("Updating.....");
              user.description = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
        case 3:
          dialogOption = {
            modelValue: user.surfaceTotal,
            placeholder: 'Cambia el area total de la propiedad.',
            arialLabel: "editDialog",
            save: function (input) {
              $log.log("Updating.....");
              user.surfaceTotal = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
        case 4:
          dialogOption = {
            modelValue: user.surfaceIn,
            placeholder: 'Cambia el area interna de la propiedad.',
            arialLabel: "editDialog",
            save: function (input) {
              $log.log("Updating.....");
              user.surfaceIn = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
        case 5:
          dialogOption = {
            modelValue: user.surfaceOut,
            placeholder: 'Cambia la area interna de la propiedad.',
            arialLabel: "editDialog",
            save: function (input) {
              $log.log("Updating.....");
              user.surfaceOut = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
      }
      return dialogOption;
    }

  }
})();
