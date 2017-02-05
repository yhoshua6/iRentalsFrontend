/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("notificationsCtrl", notificationsCtrl);


  notificationsCtrl.$inject = ["$log", "$mdDialog", "$mdEditDialog"];
  function notificationsCtrl($log, $mdDialog, $mdEditDialog) {
    //if (!isUserAlive) { $state.go("root.login"); }
    var notificationsScope = this;
    notificationsScope.selected = [];
    notificationsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    notificationsScope.notifications = [
      { id: 0, imageName: "dogs.jpg", title: "alsjkdlaskd", content: "something", for: "a" },
      { id: 1, imageName: "cats.png", title: "alsjkdlaskd", content: "something", for: "b" },
      { id: 2, imageName: "birds.jpg", title: "alsjkdlaskd", content: "something", for: "c" },
      { id: 3, imageName: "moredogs.jpg", title: "alsjkdlaskd", content: "something", for: "z" },
      { id: 4, imageName: "someName", title: "alsjkdlaskd", content: "something", for: "r" },
      { id: 5, imageName: "someName", title: "alsjkdlaskd", content: "something", for: "y" },
      { id: 6, imageName: "someName", title: "alsjkdlaskd", content: "something", for: "s" },
      { id: 7, imageName: "someName", title: "alsjkdlaskd", content: "something", for: "f" },
      { id: 8, imageName: "someName", title: "alsjkdlaskd", content: "something", for: "g" },
      { id: 9, imageName: "someName", title: "alsjkdlaskd", content: "something", for: "o" },
      { id: 10, imageName: "someName", title: "alsjkdlaskd", content: "something", for: "ce" },
      { id: 11, imageName: "someName", title: "alsjkdlaskd", content: "something", for: "e" },
      { id: 12, imageName: "someName", title: "alsjkdlaskd", content: "something", for: "v" },
      { id: 13, imageName: "someName", title: "alsjkdlaskd", content: "something", for: "l" }

    ];

    notificationsScope.deleteNotifications = function () {
      for(var i=0; i<notificationsScope.selected.length; i++)
      {
        notificationsScope.notifications.splice(notificationsScope.notifications.indexOf(notificationsScope.selected[i]), 1);
      }
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
        //controller: "newGroupCtrl",
        //controllerAs: "newGroupCtrl",
        templateUrl: "../../../../views/dashboard/admin/templates/new_notification_modal.html",
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

    function getDialogOptions(option, notification) {
      var dialogOption = null;
      switch (option) {
        case 1:
          dialogOption = {
            modelValue: notification.title,
            placeholder: 'Cambia el título de la notificación.',
            save: function (input) {
              $log.log("Updating.....");
              notification.title = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
        case 2:
          dialogOption = {
            modelValue: notification.content,
            placeholder: 'Cambia el contenido de la notificación.',
            save: function (input) {
              $log.log("Updating.....");
              notification.content = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
      }
      return dialogOption;
    }

  }
})();
