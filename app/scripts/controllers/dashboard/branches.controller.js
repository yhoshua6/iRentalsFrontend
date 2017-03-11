/**
 * Created by jose- on 01/02/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminBranchesCtrl", adminBranchesCtrl);


  adminBranchesCtrl.$inject = ["$log", "$mdSidenav", "$mdEditDialog", "$mdDialog", "requestService", "userInfoService", "USER", "BRANCHES"];
  function adminBranchesCtrl($log,$mdSidenav, $mdEditDialog, $mdDialog, requestService, userInfoService, USER, BRANCHES) {
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
        templateUrl: "../../../views/dashboard/templates/new_branch_modal.html",
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true
      }).then(function(newBranch) {
        branchesScope.branches.push(newBranch.branch);
        updateUserRoles(newBranch.branch.sender_id, newBranch.branch.id);
        updateUserRoles(newBranch.branch.receiver_id, newBranch.branch.id);
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

    function updateUserRoles(userId, id) {
      var data = {
        user: {
          branch_role: id
        }
      };
      var userBranchRole = requestService.getPromise(
        "PATCH",
        USER + "/" + userId,
        requestService.formatData(data),
        userInfoService.user.authToken
      );

      userBranchRole.then(function (response) {
        $log.log(response);
      });
    }
  }
})();
