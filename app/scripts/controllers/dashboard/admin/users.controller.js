/**
 * Created by jose- on 01/02/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminUserCtrl", adminUserCtrl);


  adminUserCtrl.$inject = ["$log", "$mdEditDialog", "$mdDialog", "userInfoService", "requestService", "USER", "INFO_USER"];
  function adminUserCtrl($log, $mdEditDialog, $mdDialog, userInfoService, requestService, USER, INFO_USER) {
    //if (!isUserAlive) { $state.go("root.login"); }
    var adminUserScope = this;
    adminUserScope.users = [];
    adminUserScope.selected = [];
    adminUserScope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
    adminUserScope.users = [];

    var users = requestService.getPromise("GET", INFO_USER, null, userInfoService.user.authToken);
    users.then(function (response) {
      if (response.status === 200) {
        $log.log(response.data);
        adminUserScope.users = response.data;
      }
    });

    adminUserScope.deleteUsers = function () {
      for(var i=0; i<adminUserScope.selected.length; i++)
      {
        var deleteInfo = requestService.getPromise("DELETE", INFO_USER + "/" + adminUserScope.selected[i].id, null, userInfoService.user.authToken);
        deleteInfo.then(function (response) {
          if (response.status === 200) {
            //adminUserScope.users = response.data;
            var deletedUser = requestService.getPromise("DELETE", USER + "/" + adminUserScope.selected[i].id, null, userInfoService.user.authToken);
            deletedUser.then(function (response) {
              if (response.status === 200) {
                //adminUserScope.users = response.data;
                adminUserScope.users.splice(adminUserScope.users.indexOf(adminUserScope.selected[i]), 1);
              }
            });
          }
        });
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
        var createdUser = requestService.getPromise("POST", USER, null, requestService.formatData(newUser));
        createdUser.then(function (response) {
          newUser.info_user.user = response.data.user;
          newUser.info_user.pwd = response.data.password_digest;
          adminUserScope.users.push(newUser.info_user);
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
              user.name = input.$modelValue;
              var updateData = {
                "info_user": {
                  "name": user.name
                }
              };

              var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateUser.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 15
            }
          };
          break;
        case 3:
          dialogOption = {
            modelValue: user.cellphone,
            placeholder: 'Cambia el celular del usuario.',
            arialLabel: "editDialog",
            save: function (input) {
              user.cellphone = input.$modelValue;
              var updateData = {
                "info_user": {
                  "cellphone": user.cellphone
                }
              };

              var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateUser.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 10
            }
          };
          break;
        case 4:
          dialogOption = {
            modelValue: user.bank_name,
            placeholder: 'Cambia el nombre del banco,',
            arialLabel: "editDialog",
            save: function (input) {
              user.bank_name = input.$modelValue;
              var updateData = {
                "info_user": {
                  "bank_name": user.bank_name
                }
              };

              var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateUser.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 15
            }
          };
          break;
        case 5:
          dialogOption = {
            modelValue: user.bank_clabe,
            placeholder: 'Cambia la clabe del banco,',
            arialLabel: "editDialog",
            save: function (input) {
              user.bank_clabe = input.$modelValue;
              var updateData = {
                "info_user": {
                  "bank_clabe": user.bank_clabe
                }
              };

              var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateUser.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 15
            }
          };
          break;
        case 6:
          dialogOption = {
            modelValue: user.bank_account,
            placeholder: 'Cambia la cuenta de banco,',
            arialLabel: "editDialog",
            save: function (input) {
              user.bank_account = input.$modelValue;
              var updateData = {
                "info_user": {
                  "bank_account": user.bank_account
                }
              };

              var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateUser.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 15
            }
          };
          break;
        case 7:
          dialogOption = {
            modelValue: user.cedula,
            placeholder: 'Cambia la cedula del usuario.',
            arialLabel: "editDialog",
            save: function (input) {
              user.cedula = input.$modelValue;
              var updateData = {
                "info_user": {
                  "cedula": user.cedula
                }
              };

              var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateUser.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 15
            }
          };
          break;
        case 8:
          dialogOption = {
            modelValue: user.pwd,
            placeholder: 'Cambia la contraseña.',
            arialLabel: "editDialog",
            save: function (input) {
              user.pwd = input.$modelValue;
              var updateData = {
                "user": {
                  "password": user.pwd,
                  "password_confirmation": user.pwd
                }
              };

              var updateUser = requestService.getPromise("PATCH", USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
              updateUser.then(function (response) {
                $log.log(response);
              });
            },
            targetEvent: event,
            validators: {
              'md-maxlength': 10
            }
          };
          break;
      }
      return dialogOption;
    }
  }
})();
