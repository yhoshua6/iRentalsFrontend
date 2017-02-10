/**
 * Created by jose- on 29/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .controller("adminHeaderCtrl", adminHeaderCtrl);

  adminHeaderCtrl.$inject = ["$mdSidenav", "userInfoService"];
  function adminHeaderCtrl($mdSidenav, userInfoService) {
    var adminHeaderScope = this;
    adminHeaderScope.userInfo = [
      { title: "Nombre: ", value: userInfoService.user.name, enabled: true, type: "text"},
      { title: "Teléfono: ", value: userInfoService.user.cellPhone, enabled: true, type: "numeric"},
      { title: "Nombre del banco: ", value: userInfoService.user.bankName, enabled: true, type: "text"},
      { title: "Clabe de Banco: ", value: userInfoService.user.bankClabe, enabled: true, type: "numeric"},
      { title: "Número de Cuenta: ", value: userInfoService.user.bankAccount, enabled: true, type: "text"},
      { title: "Cedula: ", value: userInfoService.user.cedula, enabled: true, type: "text"}
    ];

    adminHeaderScope.links = [
      { linkTo: "adminRoot.properties", label: "Propiedades"},
      { linkTo: "adminRoot.users", label: "Usuarios" },
      { linkTo: "adminRoot.branches", label: "Ramas" },
      { linkTo: "adminRoot.notifications", label: "Notificaciones" }
    ];
    adminHeaderScope.toggleLeft = buildToggler("userProfile");
    //dashHeaderScope.toggleRight = buildToggler("userNotifications");

    function buildToggler(componentId) {
      return function() { $mdSidenav(componentId).toggle(); }
    }
  }
})();
