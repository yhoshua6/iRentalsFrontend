/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminPropertiesCtrl", adminPropertiesCtrl);


  adminPropertiesCtrl.$inject = ["$log", "$state", "$mdEditDialog"];
  function adminPropertiesCtrl($log, $state, $mdEditDialog) {
    //if (!isUserAlive) { $state.go("root.login"); }
    var propertiesScope = this;
    propertiesScope.properties = [
      { id: "0", type: "local", description: "lorem ipsum", active: "true", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 },
      { id: "1", type: "local", description: "lorem ipsum", active: "true", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 },
      { id: "2", type: "local", description: "lorem ipsum", active: "true", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 },
      { id: "3", type: "local", description: "lorem ipsum", active: "true", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 },
      { id: "4", type: "local", description: "lorem ipsum", active: "true", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 },
      { id: "5", type: "local", description: "lorem ipsum", active: "true", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 },
      { id: "6", type: "local", description: "lorem ipsum", active: "true", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 },
      { id: "7", type: "local", description: "lorem ipsum", active: "true", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 },
      { id: "8", type: "local", description: "lorem ipsum", active: "true", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 }
    ];

    propertiesScope.query = {
      order: 'description',
      limit: 5,
      page: 1
    };

    propertiesScope.selected = [];

    propertiesScope.editDescription = function (event, property) {
      // if auto selection is enabled you will want to stop the event
      // from propagating and selecting the row
      event.stopPropagation();
      var promise = $mdEditDialog.small({
        modelValue: property.description,
        placeholder: 'Cambia el nombre del grupo.',
        arialLabel: "editDialog",
        save: function (input) {
          $log.log("Updating.....");
          property.description = input.$modelValue;
          $log.log("Done.");
        },
        targetEvent: event,
        validators: {
          'md-maxlength': 40
        }
      });
      promise.then(function (ctrl) {
        var input = ctrl.getInput();
        input.$viewChangeListeners.push(function () {
          input.$setValidity('test', input.$modelValue !== 'test');
        });
      });
    };

  }
})();
