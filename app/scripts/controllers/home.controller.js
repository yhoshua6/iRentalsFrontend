/**
 * Created by jose- on 02/02/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("homeCtrl", homeCtrl);

homeCtrl.$inject = ["$log", "$filter", "$mdDialog", "userInfoService", "crudService", "requestService", "NOTIFICATIONS", "NOTIFICATIONS_ROLES", "FILES_DEPOT"];
  function homeCtrl($log, $filter, $mdDialog, userInfoService, crudService, requestService, NOTIFICATIONS, NOTIFICATIONS_ROLES, FILES_DEPOT) {
    var homeScope = this;
    homeScope.notifications = [];
    homeScope.userName = userInfoService.user.userName;

    var userRoleNotifications = requestService.getPromise(
      "GET",
      NOTIFICATIONS_ROLES,
      null,
      userInfoService.user.authToken
    );
      
    homeScope.notifications = userInfoService.user.notificationRoles;
    homeScope.setNotifications = function() {
    var filesDepot = requestService.getPromise("GET", FILES_DEPOT, null, userInfoService.user.authToken);
      filesDepot.then(function (response) {
        if (response.status === 200) {
          homeScope.images = response.data;
            $log.info(homeScope.images);
        }
      });
        angular.forEach(homeScope.notifications, function(value, key) {            
            var notificationsPromise = requestService.getPromise("GET", NOTIFICATIONS + "/" + value.notification_id, null, userInfoService.user.authToken);
            notificationsPromise.then(function (responseNot) {
                if (responseNot.status === 200){
                    value.notification = responseNot.data;
                    var image = $filter('filter')(homeScope.images, {owner_id: value.notification_id})[0];
                    value.notification.image = FILES_DEPOT+'/'+image.id;
                }
            });
        });
    };
    homeScope.setNotifications();

    
    homeScope.newNotification = function($event, info) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         template:
           "<md-dialog flex='90' aria-label='newNotification'><md-toolbar><div class='md-toolbar-tools'><h2>Notificación</h2><span flex></span><md-button class='md-icon-button' ng-click='closeDialog()' aria-label='closeButton'><md-icon class='material-icons' aria-label='Close dialog'>clear</md-icon></md-button></div></md-toolbar><md-dialog-content layout style='margin-top: 50px;'><div flex='45' flex-offset='5'><img width='520' height='400' ng-src='{{info.image}}' data-err-src='../images/principal.jpg'></div><div flex='40' flex-offset='5'><h1>{{info.title}}</h1><p style='text-align: justify;'>{{info.content}}</p></div></md-dialog-content><md-dialog-actions layout='row'><span flex></span><md-button ng-click='closeDialog()'>Cancelar</md-button></md-dialog-actions></md-dialog>",
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
