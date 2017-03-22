/**
 * Created by jose- on 01/02/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminBranchesCtrl", adminBranchesCtrl);


  adminBranchesCtrl.$inject = ["$log", "$mdSidenav", "crudService", "requestService", "userInfoService", "toastServices", "USER", "BRANCHES"];
  function adminBranchesCtrl($log,$mdSidenav, crudService, requestService, userInfoService, toastServices, USER, BRANCHES) {
    var branchesScope = this;
    branchesScope.selected = [];
    branchesScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    branchesScope.branches = [];

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    var branchesPromise = requestService.getPromise("GET", BRANCHES, null, userInfoService.user.authToken);
    branchesPromise.then(function (response) {
      if (response.status === 200) {
        branchesScope.branches = response.data;
      }
    });

    branchesScope.modifyField = function (event, fieldNumber, branch) {
      crudService.edit(event, fieldNumber, branch, getDialogOptions(fieldNumber, branch));
    };


    branchesScope.deleteBranches = function () {
      for(var i=0; i<branchesScope.selected.length; i++)
      {
        var deleteBranch = requestService.getPromise("DELETE", BRANCHES + "/" + branchesScope.selected[i].id, null, userInfoService.user.authToken);
        deleteBranch.then(function (response) {
          toastServices.toastIt(response.status, "delete_record");
          if (response.status === 204) {
            branchesScope.branches.splice(branchesScope.branches.indexOf(branchesScope.selected[i]), 1);
          }
        });
      }
      branchesScope.selected = [];
    };

    branchesScope.newBranch = function (event) {
      crudService.new("newBranchCtrl", "newBranchCtrl", "../../../views/dashboard/templates/new_branch_modal.html", event)
        .then(function(newBranch) {
        branchesScope.branches.push(newBranch.branch);
      }, function () {});
    };

    function getDialogOptions(option, branch) {
      var dialogOption = {
        modelValue: null,
        placeholder: "",
        save: null,
        targetEvent: event,
        validators: null
      };

      switch (option) {
        case 1:
          dialogOption.modelValue = branch.title;
          dialogOption.placeholder = "Cambia el título.";
          dialogOption.save = function (input) {
            branch.title = input.$modelValue;
            var updateData = {
              "branch": {
                "title": branch.title
              }
            };

            var updateBranch = requestService.getPromise("PATCH", BRANCHES + "/" + branch.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateBranch.then(function (response) {
                toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = { 'md-maxlength': 40 };
          break;
        case 2:
          dialogOption.modelValue = branch.url;
          dialogOption.placeholder = "Cambia la url.";
          dialogOption.save = function (input) {
            branch.url = input.$modelValue;
            var updateData = {
              "branch": {
                "url": branch.title
              }
            };

            var updateBranch = requestService.getPromise("PATCH", BRANCHES + "/" + branch.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateBranch.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = { 'md-maxlength': 40 };
          break;
      }
      return dialogOption;
    }
  }
})();
