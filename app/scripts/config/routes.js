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
    //COMMON
    var commonHomeState = {
      name: "root.home",
      url: "common/home",
      templateUrl: "/views/dashboard/common/home.html"
    };

    var commonReportState = {
      name: "root.reports",
      url: "common/reports",
      templateUrl: "/views/dashboard/common/reports.html",
      controller: "reportsCtrl",
      controllerAs: "reportsCtrl"
    } ;

    var adminPropertiesState = {
      name: "root.properties",
      url: "admin/properties",
      templateUrl: "/views/dashboard/admin/properties.html",
      controller: "adminPropertiesCtrl",
      controllerAs: "propertiesCtrl"
    };

    var adminUsersState = {
      name: "root.users",
      url: "admin/users",
      templateUrl: "/views/dashboard/admin/users.html",
      controller: "adminUserCtrl",
      controllerAs: "adminUserCtrl"
    };

    var adminNotificationsState = {
      name: "root.notifications",
      url: "admin/notifications",
      templateUrl: "/views/dashboard/admin/notifications.html",
      controller: "notificationsCtrl",
      controllerAs: "notificationsCtrl"
    };

    var adminBranchesState = {
      name: "root.branches",
      url: "admin/branches",
      templateUrl: "/views/dashboard/admin/branches.html",
      controller: "adminBranchesCtrl",
      controllerAs: "branchesCtrl"
    };

    $stateProvider.state(loginState);
    $stateProvider.state(rootState);
    $stateProvider.state(commonHomeState);
    $stateProvider.state(commonReportState);
    $stateProvider.state(adminPropertiesState);
    $stateProvider.state(adminUsersState);
    $stateProvider.state(adminNotificationsState);
    $stateProvider.state(adminBranchesState);
    $urlRouterProvider.otherwise("/login");
  }
})();
