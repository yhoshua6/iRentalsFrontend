/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminGroupsCtrl", adminGroupsCtrl);


  adminGroupsCtrl.$inject = ["$log", "$mdEditDialog", "$mdDialog", "groups", "requestService", "userInfoService", "GROUPS"];
  function adminGroupsCtrl($log, $mdEditDialog, $mdDialog, groups, requestService, userInfoService,  GROUPS) {
    //if (!isUserAlive) { $state.go("root.login"); }
    var groupsScope = this;
    groupsScope.groups = [];
    groupsScope.selected = [];
    groupsScope.query = {
      order: 'group_name',
      limit: 5,
      page: 1
    };

    if (groups) {
      groupsScope.groups.push(groups);
    } else {
      groupsScope.groups = [
        { id: 0, group_name: "testing", group_url: "www.google.com"},
        { id: 1, group_name: "testing 2", group_url: "www.google.com"},
        { id: 2, group_name: "testing 3", group_url: "www.google.com"},
        { id: 3, group_name: "testing 4", group_url: "www.google.com"},
        { id: 4, group_name: "testing 5", group_url: "www.google.com"},
        { id: 5, group_name: "testing 6", group_url: "www.google.com"},
        { id: 6, group_name: "testing 7", group_url: "www.google.com"}
      ];
    }

    groupsScope.editGroupName = function (event, group) {
      // if auto selection is enabled you will want to stop the event
      // from propagating and selecting the row
      event.stopPropagation();
      var promise = $mdEditDialog.small({
        modelValue: group.group_name,
        placeholder: 'Cambia el nombre del grupo.',
        arialLabel: "editDialog",
        save: function (input) {
          $log.log("Updating.....");
          group.group_name = input.$modelValue;
          $log.log("Done.");
        },
        targetEvent: event,
        validators: {
          'md-maxlength': 40
        }
      });
      promise.then(function (ctrl) {
        var input = ctrl.getInput();
        input.$viewChangeListeners.push(function () {
          input.$setValidity('test', input.$modelValue !== 'test');
        });
      });
    };

    groupsScope.editGroupUrl = function (event, group) {
      // if auto selection is enabled you will want to stop the event
      // from propagating and selecting the row
      event.stopPropagation();
      var promise = $mdEditDialog.small({
        modelValue: group.group_url,
        placeholder: 'Cambia la URL del grupo.',
        arialLabel: "editDialog",
        save: function (input) {
          $log.log("Updating.....");
          group.group_url = input.$modelValue;
          $log.log("Done.");
        },
        targetEvent: event
      });
      promise.then(function (ctrl) {
        var input = ctrl.getInput();
        input.$viewChangeListeners.push(function () {
          input.$setValidity('test', input.$modelValue !== 'test');
        });
      });
    };

    groupsScope.deleteGroups = function () {
      $log.log(groupsScope.selected, "////");
      var DELETE_GROUP = GROUPS + "/";
      for(var index=0; index<groupsScope.selected.length; index++) {
        DELETE_GROUP += groupsScope.selected[index].id;
        var deleteGroupPromise = requestService.getPromise("DELETE", DELETE_GROUP, null, userInfoService.user.authToken);
        deleteGroupPromise.then(function (response) {
          $log.log(groupsScope.groups.indexOf(groupsScope.selected[index]), "_---------------------DELETED");
          groupsScope.groups.splice(groupsScope.groups.indexOf(groupsScope.selected[index]), 1);
          $log.log(groupsScope.groups);
        });
      }
    };

    groupsScope.newGroup = function (event) {
      $mdDialog.show({
        controller: "newGroupCtrl",
        controllerAs: "newGroupCtrl",
        templateUrl: "../../../../views/dashboard/admin/templates/new_group_modal.html",
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true
      })
        .then(function(answer) {
          //$scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          //$scope.status = 'You cancelled the dialog.';
        });
    };
  }
})();

