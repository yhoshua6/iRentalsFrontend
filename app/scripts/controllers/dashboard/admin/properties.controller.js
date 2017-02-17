/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminPropertiesCtrl", adminPropertiesCtrl);


  adminPropertiesCtrl.$inject = ["$log", "$mdDialog", "$mdEditDialog", "userInfoService", "requestService", "INFO_PROPERTIES", "PROPERTIES"];
  function adminPropertiesCtrl($log, $mdDialog, $mdEditDialog, userInfoService, requestService, INFO_PROPERTIES, PROPERTIES) {
    var propertiesScope = this;
    //if (!isUserAlive) { $state.go("root.login"); }
    propertiesScope.selected = [];
    propertiesScope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
    propertiesScope.properties = [];

    var propertiesPromise = requestService.getPromise("GET", INFO_PROPERTIES, null, userInfoService.user.authToken);
    propertiesPromise.then(function (response) {
      if (response.status === 200) {
        propertiesScope.properties = response.data;
      }
    });

    propertiesScope.deleteProperties = function () {
      for(var i=0; i<propertiesScope.selected.length; i++)
      {
        var deleteInfo = requestService.getPromise("DELETE", INFO_PROPERTIES + "/" + propertiesScope.selected[i].id, null, userInfoService.user.authToken);
        deleteInfo.then(function (response) {
          if (response.status === 200) {
            //adminUserScope.users = response.data;
            var deleteProperty = requestService.getPromise("DELETE", PROPERTIES + "/" + propertiesScope.selected[i].id, null, userInfoService.user.authToken);
            deleteProperty.then(function (response) {
              if (response.status === 200) {
                //adminUserScope.users = response.data;
                propertiesScope.properties.splice(propertiesScope.properties.indexOf(propertiesScope.selected[i]), 1);
              }
            });
          }
        });
      }
      propertiesScope.selected = [];
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
        controller: "newPropertyCtrl",
        controllerAs: "newPropertyCtrl",
        templateUrl: "../../../../views/dashboard/admin/templates/new_property_modal.html",
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true
      }).then(function(newProperty) {
        var createdProperty = requestService.getPromise("POST", PROPERTIES, requestService.formatData(newProperty.property), userInfoService.user.authToken);
        createdProperty.then(function (response) {
          propertiesScope.properties.push(newProperty.info_property);
        });
      }, function() {});
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
        case 6:
          dialogOption = {
            modelValue: user.notes,
            placeholder: 'Cambia las notas de la propiedad.',
            arialLabel: "editDialog",
            save: function (input) {
              $log.log("Updating.....");
              user.notes = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
        case 7:
          dialogOption = {
            modelValue: user.type,
            placeholder: 'Cambia el tipo de propiedad.',
            arialLabel: "editDialog",
            save: function (input) {
              $log.log("Updating.....");
              user.type = input.$modelValue;
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
