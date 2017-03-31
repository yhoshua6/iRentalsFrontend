/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("notificationsCtrl", notificationsCtrl);


  notificationsCtrl.$inject = ["$log", "$mdSidenav", "crudService", "requestService", "userInfoService", "toastServices", "USER", "NOTIFICATIONS", "NOTIFICATIONS_ROLES"];
  function notificationsCtrl($log, $mdSidenav, crudService, requestService, userInfoService, toastServices, USER, NOTIFICATIONS, NOTIFICATIONS_ROLES) {
    var notificationsScope = this;
    notificationsScope.selected = [];
    notificationsScope.query = {
      order: 'title',
      limit: 4,
      page: 1
    };
    notificationsScope.notifications = [];

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    var notificationsPromise = requestService.getPromise("GET", NOTIFICATIONS, null, userInfoService.user.authToken);
    notificationsPromise.then(function (response) {
      if (response.status === 200) {
        notificationsScope.notifications = response.data;
      }
    });

    notificationsScope.deleteNotifications = function () {
      for(var i=0; i<notificationsScope.selected.length; i++)
      {
        var notificationsRolesPromise = requestService.getPromise("DELETE", NOTIFICATIONS_ROLES + "/" + notificationsScope.selected[i].notifications_roles_id, null, userInfoService.user.authToken);
        notificationsRolesPromise.then(function (response) {
          if (response.status === 204) {
            //toastServices.toastIt(response.status, "delete_record");
          }
        });
        var deleteNotifications = requestService.getPromise("DELETE", NOTIFICATIONS + "/" + notificationsScope.selected[i].id, null, userInfoService.user.authToken);
        deleteNotifications.then(function (response) {
          if (response.status === 204) {
            toastServices.toastIt(response.status, "delete_record");
            notificationsScope.notifications.splice(notificationsScope.selected.indexOf(notificationsScope.selected[i]), 1);
          }
        });
      }
      notificationsScope.selected = [];
    };

    notificationsScope.modifyField = function (event,fieldNumber, notification) {
      crudService.edit(event, fieldNumber, notification, getDialogOptions(fieldNumber, notification));
    };

    notificationsScope.newNotification = function (event) {
      crudService.new("newNotificationCtrl", "newNotificationCtrl", "../../../views/dashboard/templates/new_notification_modal.html", event)
        .then(function(newNotification) {
          var data = { notification: { notifications_roles_id: newNotification.notification.notifications_roles_id } };
          var notificationsRolesPromise = requestService.getPromise("PATCH", NOTIFICATIONS + "/" + newNotification.notification.id, requestService.formatData(data), userInfoService.user.authToken);
          notificationsRolesPromise.then(function (response) {
            toastServices.toastIt(response.status, "create_record");
            if (response.status === 200) {
              notificationsScope.notifications = null;
                var notificationsPromise = requestService.getPromise("GET", NOTIFICATIONS, null, userInfoService.user.authToken);
                notificationsPromise.then(function (response) {
                    if (response.status === 200) {
                        notificationsScope.notifications = response.data;
                    }
                });
            }
          });
        }, function () {});
    };

    function getDialogOptions(option, notification) {
      var dialogOption = {
        modelValue: null,
        placeholder: "",
        save: null,
        targetEvent: event,
        validators: null
      };

      switch (option) {
        case 1:
          dialogOption.modelValue = notification.title;
          dialogOption.placeholder = "Cambia el título de la notificación.";
          dialogOption.save = function (input) {
            notification.title = input.$modelValue;
            var updateData = {
              "notification": {
                "title": notification.title
              }
            };

            var updateNotification = requestService.getPromise("PATCH", NOTIFICATIONS + "/" + notification.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateNotification.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = {
              'md-maxlength': 10
          };
          break;
        case 2:
          dialogOption.modelValue = notification.content;
          dialogOption.placeholder = "Cambia el contenido de la notificación.";
          dialogOption.save = function (input) {
            notification.content = input.$modelValue;
            var updateData = {
              "notification": {
                "content": notification.content
              }
            };

            var updateNotification = requestService.getPromise("PATCH", NOTIFICATIONS + "/" + notification.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateNotification.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = {
            'md-maxlength': 45
          };
          break;
      }

      return dialogOption;
    }

  }
})();
