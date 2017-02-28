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

  newNotificationCtrl.$inject = ["$log", "$mdDialog", "requestService", "userInfoService", "NOTIFICATIONS", "USER"];
  function newNotificationCtrl($log, $mdDialog, requestService, userInfoService, NOTIFICATIONS, USER) {
    var newNotificationScope = this;
    newNotificationScope.title = "";
    newNotificationScope.content = "";
    newNotificationScope.users = [];
    newNotificationScope.receiver = {};
    newNotificationScope.filterSelected = true;

    var usersPromise = requestService.getPromise("GET", USER, null, userInfoService.user.authToken);
    usersPromise.then(function (response) {
      if (response.status === 200) {
        newNotificationScope.users = response.data;
      }
    });

    newNotificationScope.querySearchForUsers = function (criteria) {
      return criteria ? newNotificationScope.users.filter(createFilterFor(criteria)) : [];
    };

    newNotificationScope.hide = function() {
      $mdDialog.hide();
    };

    newNotificationScope.cancel = function() {
      $mdDialog.cancel();
    };

    newNotificationScope.save = function() {
      $log.log(userInfoService.user);
      var newNotification = {
        notification: {
          user_id: userInfoService.user.id,
          title: newNotificationScope.title,
          content: newNotificationScope.content,
          receiver_id: newNotificationScope.receiver.id
        }
      };
      $log.log(newNotification);
      var notificationsPromise = requestService.getPromise("POST", NOTIFICATIONS, requestService.formatData(newNotification), userInfoService.user.authToken);
      notificationsPromise.then(function (response) {
        if (response.status === 201) {
          newNotification.notification.id = response.data.id;
          $mdDialog.hide(newNotification);
        }
      });

    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact.user.toLowerCase().indexOf(lowercaseQuery) != -1);
      };

    }
  }

})();
