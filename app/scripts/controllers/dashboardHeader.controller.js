/**
 * Created by jose- on 19/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .controller('dashboardHeaderCtrl', dashboardHeaderCtrl);

  dashboardHeaderCtrl.$inject = ['$mdSidenav', "userInfoService"];
  function dashboardHeaderCtrl($mdSidenav, userInfoService) {
    var dashHeaderScope = this;
    dashHeaderScope.userInfo = [
      { title: "Nombre: ", value: userInfoService.user.name, enabled: true, type: "text"},
      { title: "Teléfono: ", value: userInfoService.user.cellPhone, enabled: true, type: "numeric"},
      { title: "Nombre del banco: ", value: userInfoService.user.bankName, enabled: true, type: "text"},
      { title: "Clabe de Banco: ", value: userInfoService.user.bankClabe, enabled: true, type: "numeric"},
      { title: "Número de Cuenta: ", value: userInfoService.user.bankAccount, enabled: true, type: "text"},
      { title: "Cedula: ", value: userInfoService.user.cedula, enabled: true, type: "text"}
    ];
    dashHeaderScope.toggleLeft = buildToggler('userProfile');
    dashHeaderScope.toggleRight = buildToggler('userNotifications');

    function buildToggler(componentId) {
      return function() { $mdSidenav(componentId).toggle(); }
    }

    /*
     <img ng-src="https://49.media.tumblr.com/9f70ef30edcbf85eb9899ea7cbdc443d/tumblr_nlh7fww8OW1u7y7qno1_1280.gif" class="md-avatar" alt="Aliens">
     <div class="md-list-item-text">
     <h3>Abduction Day</h3>
     <h4>Aliens</h4>
     <p>Might be at 12:00 p.m</p>
     */

  }
})();
