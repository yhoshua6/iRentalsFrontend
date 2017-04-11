/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminPropertiesCtrl", adminPropertiesCtrl);


  adminPropertiesCtrl.$inject = ["$mdSidenav", "crudService", "userInfoService", "requestService", "toastServices", "INFO_PROPERTIES", "PROPERTIES"];
  function adminPropertiesCtrl($mdSidenav, crudService, userInfoService, requestService, toastServices, INFO_PROPERTIES, PROPERTIES) {
    var propertiesScope = this;
    //if (!isUserAlive) { $state.go("root.login"); }
    propertiesScope.selected = [];
    propertiesScope.query = {
      order: 'name',
      limit: 4,
      page: 1
    };
    propertiesScope.properties = [];

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

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
              toastServices.toastIt(response.status, "delete_record");
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
      crudService.edit(event, fieldNumber, property, getDialogOptions(fieldNumber, property));
    };

    propertiesScope.newProperty = function (event) {
      crudService.new("newPropertyCtrl", "newPropertyCtrl", "../../../views/dashboard/templates/new_property_modal.html", event)
        .then(function(newProperty) {
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
              toastServices.toastIt(response.status, "create_record");
              if (response.status === 200) {
                propertiesScope.properties.push(newProperty.info_property);
              }
            });
          });
        }, function() {});
    };

    function getDialogOptions(option, property) {
      var dialogOption = {
        modelValue: null,
        placeholder: "",
        save: null,
        targetEvent: event,
        validators: null
      };

      switch (option) {
        case 1:
          dialogOption.modelValue = property.name;
          dialogOption.placeholder = "Cambia el nombre de la propiedad.";
          dialogOption.save = function (input) {
            property.name = input.$modelValue;
            var updateData = {
              "info_property": {
                "name": property.name
              }
            };

            var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + property.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateProperty.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = {
            'md-maxlength': 15
          };
          break;
        case 2:
          dialogOption.modelValue = property.description;
          dialogOption.placeholder = "Cambia la descripción de la propiedad.";
          dialogOption.save = function (input) {
            property.description = input.$modelValue;
            var updateData = {
              "info_property": {
                "description": property.description
              }
            };

            var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + property.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateProperty.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = {
            'md-maxlength': 50
          };
          break;
        case 3:
          dialogOption.modelValue = property.surfaceTotal;
          dialogOption.placeholder = "Cambia el area total de la propiedad.";
          dialogOption.save = function (input) {
            property.surfaceTotal = input.$modelValue;
            var updateData = {
              "info_property": {
                "surface_total": Number(property.surfaceTotal)
              }
            };

            var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + property.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateProperty.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = {
            'md-maxlength': 4
          };
          break;
        case 4:
          dialogOption.surfaceIn = property.surfaceIn;
          dialogOption.placeholder = "Cambia el area interna de la propiedad.";
          dialogOption.save = function (input) {
            property.surfaceIn = input.$modelValue;
            var updateData = {
              "info_property": {
                "surface_in": Number(property.surfaceIn)
              }
            };

            var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + property.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateProperty.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = {
            'md-maxlength': 4
          };
          break;
        case 5:
          dialogOption.surfaceOut = property.surfaceOut;
          dialogOption.placeholder = "Cambia la area interna de la propiedad.";
          dialogOption.save = function (input) {
            property.surfaceOut = input.$modelValue;
            var updateData = {
              "info_property": {
                "surface_out": Number(property.surfaceOut)
              }
            };

            var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + property.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateProperty.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = {
            'md-maxlength': 4
          };
          break;
        case 6:
          dialogOption.notes = property.notes;
          dialogOption.placeholder = "Cambia las notas de la propiedad.";
          dialogOption.save = function (input) {
            property.notes = input.$modelValue;
            var updateData = {
              "info_property": {
                "notes": property.notes
              }
            };

            var updateProperty = requestService.getPromise("PATCH", INFO_PROPERTIES + "/" + property.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateProperty.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = {
            'md-maxlength': 40
          };
          break;
      }
      return dialogOption;
    }
  }
})();
