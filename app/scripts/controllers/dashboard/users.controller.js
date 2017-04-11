/**
 * Created by jose- on 01/02/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminUserCtrl", adminUserCtrl);


  adminUserCtrl.$inject = ["$mdSidenav", "crudService", "userInfoService", "requestService", "toastServices", "USER", "INFO_USER"];
  function adminUserCtrl($mdSidenav, crudService, userInfoService, requestService, toastServices, USER, INFO_USER) {
    var adminUserScope = this;
    adminUserScope.users = [];
    adminUserScope.selected = [];
    adminUserScope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
    adminUserScope.users = [];

    if ($mdSidenav("userProfile").isOpen()) {
      $mdSidenav("userProfile").close()
    }

    var users = requestService.getPromise("GET", INFO_USER, null, userInfoService.user.authToken);
    users.then(function (response) {
      if (response.status === 200) {
        adminUserScope.users = response.data;
      }
    });

    adminUserScope.deleteUsers = function () {
      for(var i=0; i<adminUserScope.selected.length; i++)
      {
        var user_id = adminUserScope.selected[i].user_id;
        var deleteInfo = requestService.getPromise("DELETE", INFO_USER + "/" + adminUserScope.selected[i].id, null, userInfoService.user.authToken);
        deleteInfo.then(function (response) {
          if (response.status === 204) {

          }
        });

        var deletedUser = requestService.getPromise("DELETE", USER + "/" + user_id, null, userInfoService.user.authToken);
        deletedUser.then(function (response) {
          toastServices.toastIt(response.status, "delete_record");
          if (response.status === 204) {
            adminUserScope.users.splice(adminUserScope.users.indexOf(adminUserScope.selected[i]), 1);
          }
        });


      }
      adminUserScope.selected = [];
    };

    adminUserScope.modifyField = function (event,fieldNumber, user) {
      crudService.edit(event, fieldNumber, user, getDialogOptions(fieldNumber, user));
    };

    adminUserScope.changeStatus = function (event, user) {
      event.stopPropagation();
      var info = {
        info_user: {
          part_of_pool: user.part_of_pool
        }
      };
      var userInfo = requestService.getPromise("PATCH", INFO_USER + "/"  + user.id, requestService.formatData(info), userInfoService.user.authToken);
      userInfo.then(function (response) {
        toastServices.toastIt(response.status, "update_field");
      });
    };

    adminUserScope.newUser = function (event) {
      crudService.new("newUserCtrl", "newUserCtrl", "../../../views/dashboard/templates/new_user_modal.html", event)
        .then(function(newUser) {
          var createdUser = requestService.getPromise("POST", USER, newUser, userInfoService.user.authToken);
          createdUser.then(function (response) {
            var info = {
              info_user: {
                user_id: response.data.id
              }
            };
            var userInfo = requestService.getPromise("PATCH", INFO_USER + "/"  + newUser.info_user.id, requestService.formatData(info), userInfoService.user.authToken);
            userInfo.then(function (response) {
              toastServices.toastIt(response.status, "create_record");
              if (response.status === 200) {
                adminUserScope.users.push(newUser.info_user);
              }
            });
          });
        }, function () {});
    };

    function getDialogOptions(option, user) {
      var dialogOption = {
        modelValue: null,
        placeholder: "",
        save: null,
        targetEvent: event,
        validators: null
      };

      switch (option) {
        case 1:
          dialogOption.modelValue = user.name;
          dialogOption.placeholder = "Cambia el nombre del usuario.";
          dialogOption.save = function (input) {
            user.name = input.$modelValue;
            var updateData = {
              "info_user": {
                "name": user.name
              }
            };

            var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateUser.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = { 'md-maxlength': 30 };
          break;
        case 2:
          dialogOption.modelValue = user.email;
          dialogOption.placeholder = "Cambia el correo del usuario.";
          dialogOption.save = function (input) {
            user.email = input.$modelValue;
            var updateData = {
              "info_user": {
                "email": user.email
              }
            };

            var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateUser.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = { 'md-maxlength': 40 };
          break;
        case 3:
          dialogOption.modelValue = user.cellphone;
          dialogOption.placeholder = "Cambia el celular del usuario.";
          dialogOption.save = function (input) {
            user.cellphone = input.$modelValue;
            var updateData = {
              "info_user": {
                "cellphone": user.cellphone
              }
            };

            var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateUser.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = { 'md-maxlength': 20 };
          break;
        case 4:
          dialogOption.modelValue = user.bank_name;
          dialogOption.placeholder = "Cambia el nombre del banco.";
          dialogOption.save = function (input) {
            user.bank_name = input.$modelValue;
            var updateData = {
              "info_user": {
                "bank_name": user.bank_name
              }
            };

            var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateUser.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = { 'md-maxlength': 15 };
          break;
        case 5:
          dialogOption.modelValue = user.bank_clabe;
          dialogOption.placeholder = "Cambia la clabe del banco.";
          dialogOption.save = function (input) {
            user.bank_clabe = input.$modelValue;
            var updateData = {
              "info_user": {
                "bank_clabe": user.bank_clabe
              }
            };

            var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateUser.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = { 'md-maxlength': 18 };
          break;
        case 6:
          dialogOption.modelValue = user.bank_account;
          dialogOption.placeholder = "Cambia la cuenta de banco.";
          dialogOption.save = function (input) {
            user.bank_account = input.$modelValue;
            var updateData = {
              "info_user": {
                "bank_account": user.bank_account
              }
            };

            var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateUser.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = { 'md-maxlength': 15 };
          break;
        case 7:
          dialogOption.modelValue = user.rfc;
          dialogOption.placeholder = "Cambia el rfc del usuario.";
          dialogOption.save = function (input) {
            user.rfc = input.$modelValue;
            var updateData = {
              "info_user": {
                "rfc": user.rfc
              }
            };

            var updateUser = requestService.getPromise("PATCH", INFO_USER + "/" + user.id, requestService.formatData(updateData), userInfoService.user.authToken);
            updateUser.then(function (response) {
              toastServices.toastIt(response.status, "update_field");
            });
          };
          dialogOption.validators = { 'md-maxlength': 15 };
          break;
      }
      return dialogOption;
    }
  }
})();
