/**
 * Created by jose- on 12/02/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("headerCtrl", headerCtrl);

  headerCtrl.$inject = ["$mdSidenav", "userInfoService"];
  function headerCtrl($mdSidenav, userInfoService) {
    var headerScope = this;
    headerScope.userInfo = [
      { title: "Nombre: ", value: userInfoService.user.userName, disabled: true, type: "text"},
      { title: "Teléfono: ", value: userInfoService.user.cellphone, disabled: true, type: "text"},
      { title: "Nombre del banco: ", value: userInfoService.user.bankName, disabled: true, type: "text"},
      { title: "Clabe de Banco: ", value: userInfoService.user.bankClabe, disabled: true, type: "numeric"},
      { title: "Número de Cuenta: ", value: userInfoService.user.bankAccount, disabled: true, type: "text"},
      { title: "Cedula: ", value: userInfoService.user.cedula, disabled: true, type: "text"}
    ];

    headerScope.links = [
      { linkTo: "root.properties", label: "Propiedades"},
      { linkTo: "root.users", label: "Usuarios" },
      { linkTo: "root.branches", label: "Ramas" },
      { linkTo: "root.notifications", label: "Notificaciones" }
    ];

    headerScope.toggleLeft = buildToggler("userProfile");
    //dashHeaderScope.toggleRight = buildToggler("userNotifications");

    function buildToggler(componentId) {
      return function() { $mdSidenav(componentId).toggle(); }
    }
  }
})();
