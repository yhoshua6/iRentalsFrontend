/**
 * Created by jose- on 3/11/2017.
 */
(function () {
  "use strict";
  // If we do not have CryptoJS defined; import it
  if (typeof CryptoJS == 'undefined') {
    var cryptoSrc = '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', cryptoSrc);
    document.body.appendChild(scriptTag);
  }
  angular.module("iRentalsApp")
    .controller("newGroupCtrl", newGroupCtrl);

  newGroupCtrl.$inject = ["$log", "$mdDialog", "requestService", "userInfoService", "GROUPS", "GROUP_USERS", "USER"];
  function newGroupCtrl($log, $mdDialog, requestService, userInfoService, GROUPS, USER, GROUP_USERS) {
    var newGroupScope = this;
    newGroupScope.name = "";
    newGroupScope.users = [];
    newGroupScope.filterSelected = true;
    newGroupScope.selectedUsers = [];

    var usersPromise = requestService.getPromise("GET", USER, null, userInfoService.user.authToken);
    usersPromise.then(function (response) {
      if (response.status === 200) {
        newGroupScope.users = response.data;
      }
    });

    newGroupScope.hide = function() {
      $mdDialog.hide();
    };

    newGroupScope.cancel = function() {
      $mdDialog.cancel();
    };

    newGroupScope.save = function() {
      var newGroup = {
        group: { name: newGroupScope.name },
        groups_user: {}
      };
      var groupsPromise = requestService.getPromise("POST", GROUPS, requestService.formatData(newGroup), userInfoService.user.authToken);
      groupsPromise.then(function (response) {
        if (response.status === 201) {
          newGroup.groups_user.group_id = response.data.id;

          for(var i=0; i<newGroupScope.selectedUsers.length; i++) {
            newGroup.groups_user.user_id = newGroupScope.selectedUsers[i];
            var groupsPromise = requestService.getPromise("POST", GROUP_USERS, requestService.formatData(newGroup), userInfoService.user.authToken);

            groupsPromise.then(function (response) {
              if (response.status === 201) {
                newGroup.group.groups_users = response.data.id;
                $mdDialog.hide(newGroup);
              }
            });
          }
        }
      });
    };
  }

})();
