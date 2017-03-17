/**
 * Created by jose- on 04/02/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("toastCtrl", toastCtrl);


  toastCtrl.$inject = ["toastServices"];
  function toastCtrl(toastServices) {
    var toastScope = this;
    toastScope.icon = toastServices.icon;
    toastScope.message = toastServices.message;
  }

})();
