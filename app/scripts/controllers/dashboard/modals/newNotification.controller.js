/**
 * Created by jose- on 05/02/2017.
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
    .controller("newNotificationCtrl", newNotificationCtrl);

  newNotificationCtrl.$inject = ["$log", "$mdDialog", "requestService", "userInfoService", "NOTIFICATIONS", "NOTIFICATIONS_ROLES", "USER"];
  function newNotificationCtrl($log, $mdDialog, requestService, userInfoService, NOTIFICATIONS, NOTIFICATIONS_ROLES, USER) {
    var newNotificationScope = this;
    newNotificationScope.title = "";
    newNotificationScope.content = "";
    newNotificationScope.users = [];
    newNotificationScope.receiver;
    newNotificationScope.filterSelected = true;

    var usersPromise = requestService.getPromise("GET", USER, null, userInfoService.user.authToken);
    usersPromise.then(function (response) {
      if (response.status === 200) {
        newNotificationScope.users = response.data;
          angular.forEach(newNotificationScope.users, function(value) {
              value.select = false;
          });
      }
    });

    newNotificationScope.querySearchForUsers = function (criteria) {
      return criteria ? newNotificationScope.users.filter(createFilterFor(criteria)) : [];
    };

    newNotificationScope.hide = function() {
      $mdDialog.hide();
    };
    
    newNotificationScope.selectUsers = function (thisone){
        angular.forEach(newNotificationScope.users, function(value) {
            if(value.role == thisone){
                if(value.selected == true){
                    value.selected = false;
                }else{
                    value.selected = true;
                }
            }
        });
    };

    newNotificationScope.cancel = function() {
      $mdDialog.cancel();
    };

    newNotificationScope.save = function() {
        var arrayNotification = [];
        
        newFileScope.file = file;
        if (file) {
            var newFile = {
                depot_file: {
                    owner_id: userInfoService.user.currentBranch,
                    file: file,
                    file_name: file.name
                }
            };
            $log.log(newFile);
            file.upload = Upload.upload({
                url: FILES_DEPOT,
                data: newFile,
                headers: {
                    "Authorization": userInfoService.user.authToken
                }
            });
      }
      
        
        angular.forEach(newNotificationScope.users, function(value) {
            if(value.selected == true){
                var newNotification = {
                    notification: {
                        user_id: userInfoService.user.id,
                        title: newNotificationScope.title,
                        content: newNotificationScope.content,
                        receiver_user: value.user
                    },
                    notifications_role: {
                        receiver_id: value.id
                    }
                };
                arrayNotification.push(newNotification);
            }
        });
        angular.forEach(arrayNotification, function(value, key) {
            var notificationsPromise = requestService.getPromise("POST", NOTIFICATIONS, requestService.formatData(value), userInfoService.user.authToken);
            notificationsPromise.then(function (response) {
                if (response.status === 201) {
                    value.notification.id = response.data.id;
                    value.notifications_role.notification_id = response.data.id
                    var notificationsRolesPromise = requestService.getPromise("POST", NOTIFICATIONS_ROLES, value, userInfoService.user.authToken);
                    notificationsRolesPromise.then(function (response) {
                        if (response.status === 201) {
                            value.notification.notifications_roles_id = response.data.id;
                            if(arrayNotification.length == key+1){
                                $mdDialog.hide(value);
                            }
                        }
                    });
                }
            });
        });
      /*
      var newNotification = {
        notification: {
          user_id: userInfoService.user.id,
          title: newNotificationScope.title,
          content: newNotificationScope.content,
          receiver_user: newNotificationScope.receiver.user
        },
        notifications_role: {
          receiver_id: newNotificationScope.receiver.id
        }
      };
      var notificationsPromise = requestService.getPromise("POST", NOTIFICATIONS, requestService.formatData(newNotification), userInfoService.user.authToken);
      notificationsPromise.then(function (response) {
        if (response.status === 201) {
          newNotification.notification.id = response.data.id;
          newNotification.notifications_role.notification_id = response.data.id
          var notificationsRolesPromise = requestService.getPromise("POST", NOTIFICATIONS_ROLES, newNotification, userInfoService.user.authToken);
          notificationsRolesPromise.then(function (response) {
            if (response.status === 201) {
              newNotification.notification.notifications_roles_id = response.data.id;
              $mdDialog.hide(newNotification);
            }
          });
        }
      });*/
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact.user.toLowerCase().indexOf(lowercaseQuery) != -1);
      };

    }
  }

})();
