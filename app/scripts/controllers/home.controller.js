/**
 * Created by jose- on 02/02/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("homeCtrl", homeCtrl);

homeCtrl.$inject = ["$log", "$mdDialog", "userInfoService", "crudService", "requestService", "NOTIFICATIONS", "NOTIFICATIONS_ROLES"];
  function homeCtrl($log, $mdDialog, userInfoService, crudService, requestService, NOTIFICATIONS, NOTIFICATIONS_ROLES) {
    var homeScope = this;
    homeScope.notifications = [];
    homeScope.userName = userInfoService.user.userName;

    var userRoleNotifications = requestService.getPromise(
      "GET",
      NOTIFICATIONS_ROLES,
      null,
      userInfoService.user.authToken
    );

    userRoleNotifications.then(function (response) {
      if (response.status === 200) {
        setNotifications(response.data);
      }
    });

    function setNotifications(notifications) {
      var notification;
      for (var i=0; i<notifications.length; i++) {
        notification = notifications[i];
        var userRoleNotifications = requestService.getPromise("GET",NOTIFICATIONS + "/" + notification.notification_id,null,userInfoService.user.authToken);

        userRoleNotifications.then(function (response) {
          if (response.status === 200) {
              if(userInfoService.user.userName == response.data.receiver_user){
                  homeScope.notifications.push(response.data);
              }
          }
        });
      }
    }
    
    homeScope.newNotification = function($event, info) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         template:
           "<md-dialog flex='90' aria-label='newNotification'><md-toolbar><div class='md-toolbar-tools'><h2>Notificación</h2><span flex></span><md-button class='md-icon-button' ng-click='closeDialog()' aria-label='closeButton'><md-icon class='material-icons' aria-label='Close dialog'>clear</md-icon></md-button></div></md-toolbar><md-dialog-content layout style='margin-top: 50px;'><div flex='45' flex-offset='5'><img width='520' height='400' ng-src='../../images/principal.jpg''></div><div flex='40' flex-offset='5'><h1>{{info.title}}</h1><p style='text-align: justify;'>{{info.content}}</p></div></md-dialog-content><md-dialog-actions layout='row'><span flex></span><md-button ng-click='closeDialog()'>Cancelar</md-button></md-dialog-actions></md-dialog>",
         locals: {
           info: info
         },
         controller: DialogController
      });
      function DialogController($scope, $mdDialog, info) {
        $scope.info = info;
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
      }
    }
    
    /*homeScope.newNotification = function (event, info) {
        $log.info(event);
      crudService.new("newNotificationCtrl", "newNotificationCtrl", "../../../views/dashboard/templates/get_notification_modal.html", event)
        .then(function(newNotification) {
          var data = { notification: { notifications_roles_id: newNotification.notification.notifications_roles_id } };
          var notificationsRolesPromise = requestService.getPromise("PATCH", NOTIFICATIONS + "/" + newNotification.notification.id, requestService.formatData(data), userInfoService.user.authToken);
          notificationsRolesPromise.then(function (response) {
            toastServices.toastIt(response.status, "update_field");
            if (response.status === 200) {
              notificationsScope.notifications.push(newNotification.notification);
            }
          });
        }, function () {});
    };*/
  }

})();
