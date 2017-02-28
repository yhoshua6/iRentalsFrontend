/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("notificationsCtrl", notificationsCtrl);


  notificationsCtrl.$inject = ["$log", "$mdDialog", "$mdEditDialog", "requestService", "userInfoService", "NOTIFICATIONS"];
  function notificationsCtrl($log, $mdDialog, $mdEditDialog, requestService, userInfoService, NOTIFICATIONS) {
    //if (!isUserAlive) { $state.go("root.login"); }
    var notificationsScope = this;
    notificationsScope.selected = [];
    notificationsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    notificationsScope.notifications = [];

    var notificationsPromise = requestService.getPromise("GET", NOTIFICATIONS, null, userInfoService.user.authToken);
    notificationsPromise.then(function (response) {
      if (response.status === 200) {
        notificationsScope.notifications = response.data;
      }
    });

    notificationsScope.deleteNotifications = function () {
      for(var i=0; i<notificationsScope.selected.length; i++)
      {
        var deleteNotifications = requestService.getPromise("DELETE", NOTIFICATIONS + "/" + notificationsScope.selected[i].id, null, userInfoService.user.authToken);
        deleteNotifications.then(function (response) {
          if (response.status === 204) {
            $log.log(notificationsScope.notifications);
            $log.log(notificationsScope.notifications.indexOf(notificationsScope.selected[i]));
            notificationsScope.notifications.splice(notificationsScope.notifications.indexOf(notificationsScope.selected[i]), 1);
          }
        });
      }
      notificationsScope.selected = [];
    };

    notificationsScope.modifyField = function (event,fieldNumber, notification) {
      event.stopPropagation();
      var promise = $mdEditDialog.small(getDialogOptions(fieldNumber, notification));
      promise.then(function (ctrl) {
        var input = ctrl.getInput();
        input.$viewChangeListeners.push(function () {
          input.$setValidity('test', input.$modelValue !== 'test');
        });
      });
    };


    notificationsScope.newNotification = function (event) {
      $mdDialog.show({
        controller: "newNotificationCtrl",
        controllerAs: "newNotificationCtrl",
        templateUrl: "../../../../views/dashboard/admin/templates/new_notification_modal.html",
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true
      }).then(function(newNotification) {
        notificationsScope.notifications.push(newNotification.notification);
      }, function () {});
    };

    function getDialogOptions(option, notification) {
      var dialogOption = null;
      switch (option) {
        case 1:
          dialogOption = {
            modelValue: notification.title,
            placeholder: 'Cambia el título de la notificación.',
            save: function (input) {
              notification.title = input.$modelValue;
              var updateData = {
                "notification": {
                  "title": notification.title
                }
              };

              var updateNotification = requestService.getPromise("PATCH", NOTIFICATIONS + "/" + notification.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateNotification.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 10
            }
          };
          break;
        case 2:
          dialogOption = {
            modelValue: notification.content,
            placeholder: 'Cambia el contenido de la notificación.',
            save: function (input) {
              notification.content = input.$modelValue;
              var updateData = {
                "notification": {
                  "content": notification.content
                }
              };

              var updateNotification = requestService.getPromise("PATCH", NOTIFICATIONS + "/" + notification.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateNotification.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 25
            }
          };
          break;
      }
      return dialogOption;
    }

  }
})();
