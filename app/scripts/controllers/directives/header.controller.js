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
      { title: "Nombre: ", value: userInfoService.user.userName},
      { title: "Teléfono: ", value: userInfoService.user.cellphone},
      { title: "Nombre del banco: ", value: userInfoService.user.bankName},
      { title: "Clabe de Banco: ", value: userInfoService.user.bankClabe},
      { title: "Número de Cuenta: ", value: userInfoService.user.bankAccount},
      { title: "Forma de Pago: ", value: userInfoService.user.paymentMethod},
      { title: "RFC: ", value: userInfoService.user.rfc},
      { title: "Rol: ", value: userInfoService.user.role}
    ];
    headerScope.role = userInfoService.user.role;

    headerScope.links = [
      { linkTo: "root.users", label: "Usuarios" },
      //{ linkTo: "root.groups", label: "Grupos" },
      { linkTo: "root.properties", label: "Propiedades"},
      { linkTo: "root.branches", label: "Ramas" },
      { linkTo: "root.notifications", label: "Notificaciones" }
    ];

    headerScope.toggleLeft = buildToggler("userProfile");
    //dashHeaderScope.toggleRight = buildToggler("userNotifications");

    headerScope.close = function () {
      $mdSidenav("userProfile").close()
    };

    headerScope.isAdmin = function () {
      return headerScope.role === "Administrador";
    };

    headerScope.isGuest = function () {
      return headerScope.role === "Arrendatario";
    };

    function buildToggler(componentId) {
      return function() { $mdSidenav(componentId).toggle(); }
    }
  }
})();
