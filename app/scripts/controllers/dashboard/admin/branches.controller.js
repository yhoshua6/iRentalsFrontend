/**
 * Created by jose- on 01/02/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminBranchesCtrl", adminBranchesCtrl);


  adminBranchesCtrl.$inject = ["$log", "$mdEditDialog", "$mdDialog"];
  function adminBranchesCtrl($log, $mdEditDialog, $mdDialog) {
    var branchesScope = this;
    branchesScope.selected = [];
    branchesScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };

    branchesScope.branches = [
      { id: 0, title: "testig", url: "www.google.com", propertyType: "something", propertyName: "ASD", senderUsr: "sender tes", propertyActive: true, receiverUser: "receiver test"},
      { id: 1, title: "testig", url: "www.google.com", propertyType: "something", propertyName: "ASD", senderUsr: "sender tes", propertyActive: true, receiverUser: "receiver test"},
      { id: 2, title: "testig", url: "www.google.com", propertyType: "something", propertyName: "ASD", senderUsr: "sender tes", propertyActive: true, receiverUser: "receiver test"},
      { id: 3, title: "testig", url: "www.google.com", propertyType: "something", propertyName: "ASD", senderUsr: "sender tes", propertyActive: true, receiverUser: "receiver test"},
      { id: 4, title: "testig", url: "www.google.com", propertyType: "something", propertyName: "ASD", senderUsr: "sender tes", propertyActive: true, receiverUser: "receiver test"},
      { id: 5, title: "testig", url: "www.google.com", propertyType: "something", propertyName: "ASD", senderUsr: "sender tes", propertyActive: true, receiverUser: "receiver test"},
      { id: 6, title: "testig", url: "www.google.com", propertyType: "something", propertyName: "ASD", senderUsr: "sender tes", propertyActive: true, receiverUser: "receiver test"}
    ];

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

    branchesScope.changeStatus = function (event, branch) {
      event.stopPropagation();
      branch.propertyActive = !branch.propertyActive;
    };

    branchesScope.deleteBranches = function () {
      for(var i=0; i<branchesScope.selected.length; i++)
      {
        branchesScope.branches.splice(branchesScope.branches.indexOf(branchesScope.selected[i]), 1);
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
        //$scope.status = 'You said the information was "' + answer + '".';
        newBranch.id = branchesScope.branches.length;
        branchesScope.branches.push(newBranch);
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
              $log.log("Updating.....");
              branch.title = input.$modelValue;
              $log.log("Done.");
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
              $log.log("Updating.....");
              branch.url = input.$modelValue;
              $log.log("Done.");
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
