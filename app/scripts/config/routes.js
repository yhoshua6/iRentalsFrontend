/**
 * Created by jose- on 04/01/2017.
 */
(function () {
  "use strict";

  /**
   * @ngdoc overview
   * @name iRentalsFrontApp
   * @description
   * # iRentalsFrontApp
   *
   * Routes configuration file.
   */
  angular
    .module("iRentalsApp")
    .config(routesConfig);
  routesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function routesConfig($stateProvider, $urlRouterProvider) {

    var rootState = {
      name: "root",
      abstract: true,
      url: "/",
      templateUrl: "/views/templates/login_template.html"
    };

    var rootLoginState = {
      name: "root.login",
      url: "login",
      templateUrl: "/views/login.html",
      controller: "loginCtrl as loginCtrl"
    };

    var adminRootState = {
      name: "adminRoot",
      abstract: true,
      url: "/admin/dashboard/",
      templateUrl: "/views/templates/dashboard_admin_template.html"
    };

    var adminHomeState = {
      name: "adminRoot.home",
      url: "home",
      templateUrl: "/views/dashboard/home.html"
    };

    var adminGroupState = {
      name: "adminRoot.groups",
      url: "groups",
      templateUrl: "/views/dashboard/admin/groups.html",
      controller: "adminGroupsCtrl",
      controllerAs: "groupsCtrl"
    };

    var adminPropertiesState = {
      name: "adminRoot.properties",
      url: "properties",
      templateUrl: "/views/dashboard/admin/properties.html",
      controller: "adminPropertiesCtrl",
      controllerAs: "propertiesCtrl"
    };

    var adminUsersState = {
      name: "adminRoot.users",
      url: "users",
      templateUrl: "/views/dashboard/admin/users.html"
    };


    var adminNotificationsState = {
      name: "adminRoot.notifications",
      url: "notifications",
      templateUrl: "/views/dashboard/admin/notifications.html",
      controller: "notificationsCtrl",
      controllerAs: "notificationsCtrl"
    };




    $stateProvider.state(rootState);
    $stateProvider.state(rootLoginState);
    $stateProvider.state(adminRootState);
    $stateProvider.state(adminHomeState);
    $stateProvider.state(adminGroupState);
    $stateProvider.state(adminPropertiesState);
    $stateProvider.state(adminUsersState);
    $stateProvider.state(adminNotificationsState);
    $urlRouterProvider.otherwise("/login");
  }
})();
