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
      { title: "Nombre: ", value: userInfoService.user.name, enabled: true, type: "text"},
      { title: "Teléfono: ", value: userInfoService.user.cellPhone, enabled: true, type: "numeric"},
      { title: "Nombre del banco: ", value: userInfoService.user.bankName, enabled: true, type: "text"},
      { title: "Clabe de Banco: ", value: userInfoService.user.bankClabe, enabled: true, type: "numeric"},
      { title: "Número de Cuenta: ", value: userInfoService.user.bankAccount, enabled: true, type: "text"},
      { title: "Cedula: ", value: userInfoService.user.cedula, enabled: true, type: "text"}
    ];

    headerScope.links = [
      { linkTo: "adminRoot.properties", label: "Propiedades"},
      { linkTo: "adminRoot.users", label: "Usuarios" },
      { linkTo: "adminRoot.branches", label: "Ramas" },
      { linkTo: "adminRoot.notifications", label: "Notificaciones" }
    ];

    headerScope.toggleLeft = buildToggler("userProfile");
    //dashHeaderScope.toggleRight = buildToggler("userNotifications");

    function buildToggler(componentId) {
      return function() { $mdSidenav(componentId).toggle(); }
    }
  }
})();
