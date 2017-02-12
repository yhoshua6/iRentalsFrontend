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

    var loginState = {
      name: "login",
      url: "/login",
      templateUrl: "/views/login.html",
      controller: "loginCtrl as loginCtrl"
    };

    var rootState = {
      name: "root",
      abstract: true,
      url: "/",
      templateUrl: "/views/templates/dashboard_template.html"
    };

    var commonHomeState = {
      name: "root.home",
      url: "common/home",
      templateUrl: "/views/dashboard/common/home.html"
    };

    var adminRootState = {
      name: "adminRoot",
      abstract: true,
      url: "/admin/dashboard/",
      templateUrl: "/views/templates/dashboard_template.html"
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
      templateUrl: "/views/dashboard/admin/users.html",
      controller: "adminUserCtrl",
      controllerAs: "adminUserCtrl"
    };

    var adminNotificationsState = {
      name: "adminRoot.notifications",
      url: "notifications",
      templateUrl: "/views/dashboard/admin/notifications.html",
      controller: "notificationsCtrl",
      controllerAs: "notificationsCtrl"
    };

    var adminBranchesState = {
      name: "adminRoot.branches",
      url: "branches",
      templateUrl: "/views/dashboard/admin/branches.html",
      controller: "adminBranchesCtrl",
      controllerAs: "branchesCtrl"
    };



    $stateProvider.state(loginState);
    $stateProvider.state(rootState);
    $stateProvider.state(commonHomeState);
    $stateProvider.state(adminRootState);
    $stateProvider.state(adminGroupState);
    $stateProvider.state(adminPropertiesState);
    $stateProvider.state(adminUsersState);
    $stateProvider.state(adminNotificationsState);
    $stateProvider.state(adminBranchesState);
    $urlRouterProvider.otherwise("/login");
  }
})();
