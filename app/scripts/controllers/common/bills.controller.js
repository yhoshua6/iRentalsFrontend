(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("billsCtrl", billsCtrl);

  billsCtrl.$inject = ["$mdSidenav", "$log", "userInfoService", "requestService", "crudService", "toastServices", "FILES_DEPOT"];
  function billsCtrl($mdSidenav, $log, userInfoService, requestService, crudService, toastServices, FILES_DEPOT) {
    var billsScope = this;
    billsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    billsScope.files = [];
    billsScope.selected = [];
    billsScope.getFilesToPay = true;
    billsScope.isSender = userInfoService.user.isSender;
    billsScope.isAdmin = function () {
      return userInfoService.user.role === "Administrador";
    };

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }


    var depotFilter = {
      depot_file: {
        owner_id: userInfoService.user.currentBranch
      }
    };
    $log.log(depotFilter);
    var filesDepot = requestService.getPromise(
      "GET",
      FILES_DEPOT,
      requestService.formatData(depotFilter),
      userInfoService.user.authToken
    );

    filesDepot.then(function (response) {
      if (response.status === 200) {
        billsScope.files = response.data;
      }
    });

    billsScope.delete = function() {
      for(var i=0; i<billsScope.selected.length; i++)
      {
        var indexItem = billsScope.files.indexOf(billsScope.selected[i]);
        var deleteBranch = requestService.getPromise("DELETE", FILES_DEPOT + "/" + billsScope.selected[i].id, null, userInfoService.user.authToken);
        deleteBranch.then(function (response) {
          toastServices.toastIt(response.status, "file_upload");
          if (response.status === 204) {
            billsScope.files.splice(indexItem, 1);
          }
        });
      }
      billsScope.selected = [];
    };

    billsScope.newFile = function (event) {
      crudService.new("newFileCtrl", "newFileCtrl", "../../../../views/common/modals/upload_file.html", event)
        .then(function(newFile) {
          $log.log(newFile);
          billsScope.files.push(newFile);
        }, function () {});
    };

    billsScope.download = function() {
      for(var i=0; i<billsScope.selected.length; i++)
      {
        var indexItem = billsScope.files.indexOf(billsScope.selected[i]);
        var deleteBranch = requestService.getPromise("GET", FILES_DEPOT + "/" + billsScope.selected[i].id, null, userInfoService.user.authToken);
        deleteBranch.then(function (response) {
          toastServices.toastIt(response.status, "file_get");
          if (response.status === 204) {
            billsScope.files.splice(indexItem, 1);
          }
        });
      }
      billsScope.selected = [];
    };
  }
})();
