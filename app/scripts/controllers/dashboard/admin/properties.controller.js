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
          if (response.status === 204) {
            var deleteProperty = requestService.getPromise("DELETE", PROPERTIES + "/" + propertiesScope.selected[i].property_id, null, userInfoService.user.authToken);
            deleteProperty.then(function (response) {
              if (response.status === 204) {
                propertiesScope.properties.splice(propertiesScope.properties.indexOf(propertiesScope.selected[i]), 1);
              }
            });
          }
        });
      }
      propertiesScope.selected = [];
    };

    propertiesScope.modifyField = function (event, fieldNumber, property) {
      event.stopPropagation();
      var promise = $mdEditDialog.small(getDialogOptions(fieldNumber, property));
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
        var createdProperty = requestService.getPromise("POST", PROPERTIES, requestService.formatData(newProperty), userInfoService.user.authToken);
        createdProperty.then(function (response) {
          var propertyId = {
            info_property: {
              property_id: response.data.id
            }
          };
          newProperty.info_property.property_id = response.data.id;
          var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + newProperty.info_property.id, requestService.formatData(propertyId), userInfoService.user.authToken);
          updateProperty.then(function (response) {
            propertiesScope.properties.push(newProperty.info_property);
          });
        });
      }, function() {});
    };

    function getDialogOptions(option, property) {
      var dialogOption = null;
      switch (option) {
        case 1:
          dialogOption = {
            modelValue: property.name,
            placeholder: 'Cambia el nombre de la propiedad.',
            save: function (input) {
              property.name = input.$modelValue;
              var updateData = {
                "info_property": {
                  "name": property.name
                }
              };

              var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + property.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateProperty.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 15
            }
          };
          break;
        case 2:
          dialogOption = {
            modelValue: property.description,
            placeholder: 'Cambia la descripción de la propiedad.',
            save: function (input) {
              property.description = input.$modelValue;
              var updateData = {
                "info_property": {
                  "description": property.description
                }
              };

              var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + property.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateProperty.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 50
            }
          };
          break;
        case 3:
          dialogOption = {
            modelValue: property.surfaceTotal,
            placeholder: 'Cambia el area total de la propiedad.',
            arialLabel: "editDialog",
            save: function (input) {
              property.surfaceTotal = input.$modelValue;
              var updateData = {
                "info_property": {
                  "surface_total": Number(property.surfaceTotal)
                }
              };

              var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + property.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateProperty.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 4
            }
          };
          break;
        case 4:
          dialogOption = {
            modelValue: property.surfaceIn,
            placeholder: 'Cambia el area interna de la propiedad.',
            arialLabel: "editDialog",
            save: function (input) {
              property.surfaceIn = input.$modelValue;
              var updateData = {
                "info_property": {
                  "surface_in": Number(property.surfaceIn)
                }
              };

              var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + property.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateProperty.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 4
            }
          };
          break;
        case 5:
          dialogOption = {
            modelValue: property.surfaceOut,
            placeholder: 'Cambia la area interna de la propiedad.',
            arialLabel: "editDialog",
            save: function (input) {
              property.surfaceOut = input.$modelValue;
              var updateData = {
                "info_property": {
                  "surface_out": Number(property.surfaceOut)
                }
              };

              var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + property.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateProperty.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 4
            }
          };
          break;
        case 6:
          dialogOption = {
            modelValue: property.notes,
            placeholder: 'Cambia las notas de la propiedad.',
            arialLabel: "editDialog",
            save: function (input) {
              property.notes = input.$modelValue;
              var updateData = {
                "info_property": {
                  "notes": property.notes
                }
              };

              var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + property.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateProperty.then(function (response) {
                $log.log(response);
              });
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
