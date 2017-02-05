/**
 * Created by jose- on 05/02/2017.
 */
(function () {
  "use strict";
  // If we do not have CryptoJS defined; import it
  if (typeof CryptoJS == 'undefined') {
    var cryptoSrc = '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', cryptoSrc);
    document.body.appendChild(scriptTag);
  }
  angular.module("iRentalsApp")
    .controller("newPropertyCtrl", newPropertyCtrl);

  newPropertyCtrl.$inject = ["$log", "$mdDialog"];
  function newPropertyCtrl($log, $mdDialog) {
    var newPropertyScope = this;
    newPropertyScope.name = "";
    newPropertyScope.description = "";
    newPropertyScope.active = false;
    newPropertyScope.surfaceTotal = "";
    newPropertyScope.surfaceIn = "";
    newPropertyScope.surfaceOut = "";
    newPropertyScope.assignedTo = "";

    newPropertyScope.hide = function() {
      $mdDialog.hide();
    };

    newPropertyScope.cancel = function() {
      $mdDialog.cancel();
    };

    newPropertyScope.save = function() {
      var newProperty = {
        id: 0,
        name: newPropertyScope.name,
        description: newPropertyScope.description,
        active: newPropertyScope.active,
        surfaceTotal: newPropertyScope.surfaceTotal,
        surfaceIn: newPropertyScope.surfaceIn,
        surfaceOut: newPropertyScope.surfaceOut
      };
      $mdDialog.hide(newProperty);
    };
  }

})();
