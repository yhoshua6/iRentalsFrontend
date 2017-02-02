/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminGroupsCtrl", adminGroupsCtrl);


  adminGroupsCtrl.$inject = ["$log", "$mdEditDialog", "requestService", "userInfoService"];
  function adminGroupsCtrl($log, $mdEditDialog, requestService, userInfoService) {
    //if (!isUserAlive) { $state.go("root.login"); }
    var groupsScope = this;

    groupsScope.query = {
      order: 'group_name',
      limit: 5,
      page: 1
    };

    groupsScope.selected = [];

    groupsScope.groups = [
      { id: 0, group_name: "testing", group_url: "www.google.com"},
      { id: 1, group_name: "testing 2", group_url: "www.google.com"},
      { id: 2, group_name: "testing 3", group_url: "www.google.com"},
      { id: 3, group_name: "testing 4", group_url: "www.google.com"},
      { id: 4, group_name: "testing 5", group_url: "www.google.com"},
      { id: 5, group_name: "testing 6", group_url: "www.google.com"},
      { id: 6, group_name: "testing 7", group_url: "www.google.com"}
    ];

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
    };
  }
})();


