/**
 * Created by jose- on 12/02/2017.
 */
(function () {
  "use strict";

  angular.module("iRentalsApp")
    .controller("headerCtrl", headerCtrl);

  headerCtrl.$inject = ["$mdSidenav", "userInfoService", "crudService"];
  function headerCtrl($mdSidenav, userInfoService, crudService) {
    var headerScope = this;
    headerScope.userInfo = [
      { title: "Usuario: ", value: userInfoService.user.user},
      { title: "Nombre: ", value: userInfoService.user.userName},
      { title: "Email: ", value: userInfoService.user.email},
      { title: "Teléfono: ", value: userInfoService.user.cellphone},
      { title: "Nombre del banco: ", value: userInfoService.user.bankName},
      { title: "CLABE de banco: ", value: userInfoService.user.bankClabe},
      { title: "Número de cuenta: ", value: userInfoService.user.bankAccount},
      { title: "Forma de pago: ", value: userInfoService.user.paymentMethod},
      { title: "Parte del pool: ", value: (userInfoService.user.partPool) ? "Si" : "No"},
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

    headerScope.showSupport = function () {
      crudService.new("supportCtrl", "supportCtrl", "../../../views/dashboard/templates/support_contact.html", event)
        .then(function(answer) {

        }, function () {});
      headerScope.close();
    };

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
