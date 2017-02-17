/**
 * Created by jose- on 01/02/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminUserCtrl", adminUserCtrl);


  adminUserCtrl.$inject = ["$log", "$mdEditDialog", "$mdDialog", "requestService", "USER"];
  function adminUserCtrl($log, $mdEditDialog, $mdDialog, requestService, USER) {
    //if (!isUserAlive) { $state.go("root.login"); }
    var adminUserScope = this;
    adminUserScope.users = [];
    adminUserScope.selected = [];
    adminUserScope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
    adminUserScope.users = [
      { id: 0, name: "test", cellphone: "000-000-0000", bankName: "Alligator Inc", bankClabe: "asd-123",
        bankAccount: "123-das-123", cedula: "something", user: "someUser", pwd: "iRentals123"},
      { id: 1, name: "test", cellphone: "000-000-0000", bankName: "Alligator Inc", bankClabe: "asd-123",
        bankAccount: "123-das-123", cedula: "something", user: "someUser", pwd: "iRentals123"},
      { id: 2, name: "test", cellphone: "000-000-0000", bankName: "Alligator Inc", bankClabe: "asd-123",
        bankAccount: "123-das-123", cedula: "something", user: "someUser", pwd: "iRentals123"},
      { id: 3, name: "test", cellphone: "000-000-0000", bankName: "Alligator Inc", bankClabe: "asd-123",
        bankAccount: "123-das-123", cedula: "something", user: "someUser", pwd: "iRentals123"},
      { id: 4, name: "test", cellphone: "000-000-0000", bankName: "Alligator Inc", bankClabe: "asd-123",
        bankAccount: "123-das-123", cedula: "something", user: "someUser", pwd: "iRentals123"},
      { id: 5, name: "test", cellphone: "000-000-0000", bankName: "Alligator Inc", bankClabe: "asd-123",
        bankAccount: "123-das-123", cedula: "something", user: "someUser", pwd: "iRentals123"},
      { id: 6, name: "test", cellphone: "000-000-0000", bankName: "Alligator Inc", bankClabe: "asd-123",
        bankAccount: "123-das-123", cedula: "something", user: "someUser", pwd: "iRentals123"},
      { id: 7, name: "test", cellphone: "000-000-0000", bankName: "Alligator Inc", bankClabe: "asd-123", bankAccount: "123-das-123", cedula: "something"}
    ];

    adminUserScope.deleteUsers = function () {
      for(var i=0; i<adminUserScope.selected.length; i++)
      {
        adminUserScope.users.splice(adminUserScope.users.indexOf(adminUserScope.selected[i]), 1);
      }
      adminUserScope.selected = [];
    };

    adminUserScope.modifyField = function (event,fieldNumber, user) {
      event.stopPropagation();
      var promise = $mdEditDialog.small(getDialogOptions(fieldNumber, user));
      promise.then(function (ctrl) {
        var input = ctrl.getInput();
        input.$viewChangeListeners.push(function () {
          input.$setValidity('test', input.$modelValue !== 'test');
        });
      });
    };


    adminUserScope.newUser = function (event) {
      $mdDialog.show({
        controller: "newUserCtrl",
        controllerAs: "newUserCtrl",
        templateUrl: "../../../../views/dashboard/admin/templates/new_user_modal.html",
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true
      }).then(function(newUser) {
        var createdUser = requestService.getPromise("POST", USER, requestService.formatData(newUser));
        createdUser.then(function (response) {
          var createdUser = requestService.getPromise("POST", USER, requestService.formatData(newUser));
          createdUser.then(function (response) {
            $log.log(response.data);
            adminUserScope.users.push(response.data);
          });
        });
      }, function () {});
    };

    function getDialogOptions(option, user) {
      var dialogOption = null;
      switch (option) {
        case 1:
          dialogOption = {
            modelValue: user.name,
            placeholder: 'Cambia el nombre del usuario.',
            save: function (input) {
              $log.log("Updating.....");
              user.name = input.$modelValue;
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
            modelValue: user.lastName,
            placeholder: 'Cambia el apellido del usuario.',
            save: function (input) {
              $log.log("Updating.....");
              user.lastName = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
        case 3:
          dialogOption = {
            modelValue: user.cellphone,
            placeholder: 'Cambia el celular del usuario.',
            arialLabel: "editDialog",
            save: function (input) {
              $log.log("Updating.....");
              user.cellphone = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
        case 4:
          dialogOption = {
            modelValue: user.bankName,
            placeholder: 'Cambia el nombre del banco,',
            arialLabel: "editDialog",
            save: function (input) {
              $log.log("Updating.....");
              user.bankName = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
        case 5:
          dialogOption = {
            modelValue: user.bankClabe,
            placeholder: 'Cambia la clabe del banco,',
            arialLabel: "editDialog",
            save: function (input) {
              $log.log("Updating.....");
              user.bankClabe = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
        case 6:
          dialogOption = {
            modelValue: user.bankAccount,
            placeholder: 'Cambia la cuenta de banco,',
            arialLabel: "editDialog",
            save: function (input) {
              $log.log("Updating.....");
              user.bankAccount = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;
        case 7:
          dialogOption = {
            modelValue: user.cedula,
            placeholder: 'Cambia la cedula del usuario.',
            arialLabel: "editDialog",
            save: function (input) {
              $log.log("Updating.....");
              user.cedula = input.$modelValue;
              $log.log("Done.");
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 40
            }
          };
          break;

        case 8:
          dialogOption = {
            modelValue: user.pwd,
            placeholder: 'Cambia la contraseña.',
            arialLabel: "editDialog",
            save: function (input) {
              $log.log("Updating.....");
              user.pwd = input.$modelValue;
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
