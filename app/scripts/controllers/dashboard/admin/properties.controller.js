/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminPropertiesCtrl", adminPropertiesCtrl);


  adminPropertiesCtrl.$inject = ["$log", "$state"];
  function adminPropertiesCtrl($log, $state) {
    //if (!isUserAlive) { $state.go("root.login"); }
    var propertiesScope = this;
    propertiesScope.properties = [
      { id: "0", type: "local", description: "lorem ipsum", active: "www.google.com", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 },
      { id: "1", type: "local", description: "lorem ipsum", active: "www.google.com", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 },
      { id: "2", type: "local", description: "lorem ipsum", active: "www.google.com", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 },
      { id: "3", type: "local", description: "lorem ipsum", active: "www.google.com", surfaceTotal: 0.32, surfaceIn: 10.2, surfaceOut: 2.10 }
    ];

    propertiesScope.deleteProperty = function (propertyId) {
      $log.log("----------------", propertyId);
    };

    propertiesScope.doNothing = function () {
    };

  }
})();
