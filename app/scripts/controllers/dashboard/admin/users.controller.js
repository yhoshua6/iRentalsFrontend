/**
 * Created by jose- on 01/02/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminUserCtrl", adminUserCtrl);


  adminUserCtrl.$inject = ["$log", "$mdEditDialog", "$mdDialog"];
  function adminUserCtrl($log, $mdEditDialog, $mdDialog) {
    //if (!isUserAlive) { $state.go("root.login"); }
    var adminUserScope = this;
    adminUserScope.users = [];
    adminUserScope.selected = [];
    adminUserScope.query = {
      order: 'group_name',
      limit: 5,
      page: 1
    };

    adminUserScope.users = [
      { id: 0, email: "testing@gmail.com", firstName: "test", lastName: "test", cellphone: "000-000-0000",
        bankName: "Alligator Inc", bankClabe: "asd-123", bankAccount: "123-das-123", cedula: "something"},
      { id: 1, email: "testing@gmail.com", firstName: "test", lastName: "test", cellphone: "000-000-0000",
        bankName: "Alligator Inc", bankClabe: "asd-123", bankAccount: "123-das-123", cedula: "something"},
      { id: 2, email: "testing@gmail.com", firstName: "test", lastName: "test", cellphone: "000-000-0000",
        bankName: "Alligator Inc", bankClabe: "asd-123", bankAccount: "123-das-123", cedula: "something"},
      { id: 3, email: "testing@gmail.com", firstName: "test", lastName: "test", cellphone: "000-000-0000",
        bankName: "Alligator Inc", bankClabe: "asd-123", bankAccount: "123-das-123", cedula: "something"},
      { id: 4, email: "testing@gmail.com", firstName: "test", lastName: "test", cellphone: "000-000-0000",
        bankName: "Alligator Inc", bankClabe: "asd-123", bankAccount: "123-das-123", cedula: "something"},
      { id: 5, email: "testing@gmail.com", firstName: "test", lastName: "test", cellphone: "000-000-0000",
        bankName: "Alligator Inc", bankClabe: "asd-123", bankAccount: "123-das-123", cedula: "something"},
      { id: 6, email: "testing@gmail.com", firstName: "test", lastName: "test", cellphone: "000-000-0000",
        bankName: "Alligator Inc", bankClabe: "asd-123", bankAccount: "123-das-123", cedula: "something"},
      { id: 7, email: "testing@gmail.com", firstName: "test", lastName: "test", cellphone: "000-000-0000",
        bankName: "Alligator Inc", bankClabe: "asd-123", bankAccount: "123-das-123", cedula: "something"}
    ];

    adminUserScope.userFirstName = function (event, user) {
      event.stopPropagation();
      var promise = $mdEditDialog.small({
        modelValue: user.firstName,
        placeholder: 'Cambia el nombre del usuario.',
        arialLabel: "editDialog",
        save: function (input) {
          $log.log("Updating.....");
          user.firstName = input.$modelValue;
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



    adminUserScope.deleteUsers = function () {
      $log.log(adminUserScope.selected, "////");

    };

    adminUserScope.newUser = function (event) {
      $mdDialog.show({
        //controller: "newGroupCtrl",
        //controllerAs: "newGroupCtrl",
        templateUrl: "../../../../views/dashboard/admin/templates/new_user_modal.html",
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
  }
})();
