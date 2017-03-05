(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("newFileCtrl", newFileCtrl);

  newFileCtrl.$inject = ["$mdDialog", "$log"];
  function newFileCtrl($mdDialog, $log) {
    var newFileScope = this;
    newFileScope.name = "";
    newFileScope.fileName = "";
    newFileScope.fileTransaction = {};
    newFileScope.fileTransactions = [
      {id: 0, fileTransaction: "Comprobante de Pago"},
      {id: 1, fileTransaction: "Factura"}
    ];

    newFileScope.hide = function() {
      $mdDialog.hide();
    };

    newFileScope.cancel = function() {
      $mdDialog.cancel();
    };

    newFileScope.save = function() {
      var newFile = {
        depot_file: {
          file_name: newFileScope.fileName,
          file: newFileScope.file
        }
      };
      $mdDialog.hide(newFile);
    };
  }
})();
