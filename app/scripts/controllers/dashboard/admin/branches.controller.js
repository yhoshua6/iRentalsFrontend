/**
 * Created by jose- on 01/02/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminBranchesCtrl", adminBranchesCtrl);


  adminBranchesCtrl.$inject = ["$log", "$mdEditDialog", "$mdDialog", "requestService", "userInfoService", "BRANCHES", "BRANCHES_ROLES"];
  function adminBranchesCtrl($log, $mdEditDialog, $mdDialog, requestService, userInfoService, BRANCHES, BRANCHES_ROLES) {
    var branchesScope = this;
    branchesScope.selected = [];
    branchesScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    branchesScope.branches = [];

    var branchesPromise = requestService.getPromise("GET", BRANCHES, null, userInfoService.user.authToken);
    branchesPromise.then(function (response) {
      if (response.status === 200) {
        $log.log(response);
        branchesScope.branches = response.data;
      }
    });

    branchesScope.modifyField = function (event, fieldNumber, branch) {
      event.stopPropagation();
      var promise = $mdEditDialog.small(getDialogOptions(fieldNumber, branch));
      promise.then(function (ctrl) {
        var input = ctrl.getInput();
        input.$viewChangeListeners.push(function () {
          input.$setValidity('test', input.$modelValue !== 'test');
        });
      });
    };

    branchesScope.deleteBranches = function () {
      for(var i=0; i<branchesScope.selected.length; i++)
      {
        var deleteBranch = requestService.getPromise("DELETE", BRANCHES + "/" + branchesScope.selected[i].id, null, userInfoService.user.authToken);
        deleteBranch.then(function (response) {
          $log.log(response);
          if (response.status === 204) {
              branchesScope.branches.splice(branchesScope.branches.indexOf(branchesScope.selected[i]), 1);
          }
        });
      }
      branchesScope.selected = [];
    };

    branchesScope.newBranch = function (event) {
      $mdDialog.show({
        controller: "newBranchCtrl",
        controllerAs: "newBranchCtrl",
        templateUrl: "../../../../views/dashboard/admin/templates/new_branch_modal.html",
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true
      }).then(function(newBranch) {
        var branchesPromise = requestService.getPromise("POST", BRANCHES_ROLES, requestService.formatData(newBranch), userInfoService.user.authToken);
        branchesPromise.then(function (response) {
          if (response.status === 201) {
            branchesScope.branches.push(newBranch.branch);
          }
        });

      }, function () {});
    };

    function getDialogOptions(option, branch) {
      var dialogOption = null;
      switch (option) {
        case 1:
          dialogOption = {
            modelValue: branch.title,
            placeholder: 'Cambia el título.',
            save: function (input) {
              branch.title = input.$modelValue;
              var updateData = {
                "branch": {
                  "title": branch.title
                }
              };

              var updateBranch = requestService.getPromise("PATCH", BRANCHES + "/" + branch.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateBranch.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
        case 2:
          dialogOption = {
            modelValue: branch.url,
            placeholder: 'Cambia la url.',
            save: function (input) {
              branch.url = input.$modelValue;
              var updateData = {
                "branch": {
                  "url": branch.title
                }
              };

              var updateBranch = requestService.getPromise("PATCH", BRANCHES + "/" + branch.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateBranch.then(function (response) {
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
