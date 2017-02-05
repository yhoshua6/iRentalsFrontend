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

  newNotificationCtrl.$inject = ["$log", "$mdDialog"];
  function newNotificationCtrl($log, $mdDialog) {
    var newNotificationScope = this;
    newNotificationScope.title = "";
    newNotificationScope.content = "";
    newNotificationScope.for = "";

    newNotificationScope.hide = function() {
      $mdDialog.hide();
    };

    newNotificationScope.cancel = function() {
      $mdDialog.cancel();
    };

    newNotificationScope.save = function() {
      var newNotification = {
        id: 0,
        imageName: notificationImage.files[0].name,
        title: newNotificationScope.title,
        content: newNotificationScope.content,
        for: newNotificationScope.for
      };
      $mdDialog.hide(newNotification);
    };
  }

})();
