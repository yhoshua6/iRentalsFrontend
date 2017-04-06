/**
 * Created by jose- on 01/02/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminBranchesCtrl", adminBranchesCtrl);


  adminBranchesCtrl.$inject = ["$mdSidenav", "crudService", "requestService", "userInfoService", "toastServices", "BRANCHES", "BRANCHES_ROLES"];
  function adminBranchesCtrl($mdSidenav, crudService, requestService, userInfoService, toastServices, BRANCHES, BRANCHES_ROLES) {
    var branchesScope = this;
    branchesScope.selected = [];
    branchesScope.query = {
      order: 'title',
      limit: 4,
      page: 1
    };
    branchesScope.branches = [];

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    branchesScope.allBranches = function(){
        branchesScope.branchesRoles = [];
        var branchesRolesPromise = requestService.getPromise("GET", BRANCHES_ROLES, null, userInfoService.user.authToken);
        branchesRolesPromise.then(function (response) {
          if (response.status === 200) {
            branchesScope.branchesRoles = response.data;
            angular.forEach(branchesScope.branchesRoles, function(value) {
              var branchesPromise = requestService.getPromise("GET", BRANCHES+'/'+value.branch_id, null, userInfoService.user.authToken);
                branchesPromise.then(function (responseB) {
                    value.branch = responseB.data;
                });
            });
          }
        });
    };
    branchesScope.allBranches();

    branchesScope.modifyField = function (event, fieldNumber, branch) {
      crudService.edit(event, fieldNumber, branch, getDialogOptions(fieldNumber, branch));
    };


    branchesScope.deleteBranches = function () {
        angular.forEach(branchesScope.selected, function(value) {
            var deleteBranch = requestService.getPromise("DELETE", BRANCHES_ROLES + "/" + value.id, null, userInfoService.user.authToken);
            deleteBranch.then(function (response) {
                toastServices.toastIt(response.status, "delete_record");
                if (response.status === 204) {
                    branchesScope.branchesRoles.splice(branchesScope.branchesRoles.indexOf(value), 1);
                }
            });
        });
      branchesScope.selected = [];
      branchesScope.allBranches();
    };

    branchesScope.newBranch = function (event) {
      crudService.new("newBranchCtrl", "newBranchCtrl", "../../../views/dashboard/templates/new_branch_modal.html", event)
        .then(function(newBranch) {
          userInfoService.setCurrentBranchToUser();
          branchesScope.allBranches();
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
