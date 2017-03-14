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
      templateUrl: "/views/common/home.html",
      controller: "homeCtrl",
      controllerAs: "homeCtrl"
    };

    var commonVoucherState = {
      name: "root.voucher",
      url: "common/vouchers",
      templateUrl: "/views/common/vouchers.html",
      controller: "vouchersCtrl",
      controllerAs: "vouchersCtrl"
    };

    var commonReportState = {
      name: "root.reports",
      url: "common/reports",
      templateUrl: "/views/common/reports.html",
      controller: "reportsCtrl",
      controllerAs: "reportsCtrl"
    };

    var commonBillState = {
      name: "root.bills",
      url: "common/bills",
      templateUrl: "/views/common/bills.html",
      controller: "billsCtrl",
      controllerAs: "billsCtrl"
    };

    var commonDocumentState = {
      name: "root.documents",
      url: "common/documents",
      templateUrl: "/views/common/documents.html",
      controller: "docsCtrl",
      controllerAs: "docsCtrl"
    };

    var commonGatheringState = {
      name: "root.gatherings",
      url: "common/gatherings",
      templateUrl: "/views/common/gatherings.html",
      controller: "gatheringsCtrl",
      controllerAs: "gatheringsCtrl"
    };

    var adminPropertiesState = {
      name: "root.properties",
      url: "admin/properties",
      templateUrl: "/views/dashboard/properties.html",
      controller: "adminPropertiesCtrl",
      controllerAs: "propertiesCtrl"
    };

    var adminUsersState = {
      name: "root.users",
      url: "admin/users",
      templateUrl: "/views/dashboard/users.html",
      controller: "adminUserCtrl",
      controllerAs: "adminUserCtrl"
    };

    /*var adminGroupsState = {
      name: "root.groups",
      url: "admin/groups",
      templateUrl: "/views/dashboard/groups.html",
      controller: "adminGroupsCtrl",
      controllerAs: "groupsCtrl"
    };*/

    var adminNotificationsState = {
      name: "root.notifications",
      url: "admin/notifications",
      templateUrl: "/views/dashboard/notifications.html",
      controller: "notificationsCtrl",
      controllerAs: "notificationsCtrl"
    };

    var adminBranchesState = {
      name: "root.branches",
      url: "admin/branches",
      templateUrl: "/views/dashboard/branches.html",
      controller: "adminBranchesCtrl",
      controllerAs: "branchesCtrl"
    };

    $stateProvider.state(loginState);
    $stateProvider.state(rootState);
    $stateProvider.state(commonHomeState);
    $stateProvider.state(commonReportState);
    $stateProvider.state(commonVoucherState);
    $stateProvider.state(commonBillState);
    $stateProvider.state(commonDocumentState);
    $stateProvider.state(commonGatheringState);
    $stateProvider.state(adminPropertiesState);
    $stateProvider.state(adminUsersState);
    $stateProvider.state(adminNotificationsState);
    $stateProvider.state(adminBranchesState);
    //$stateProvider.state(adminGroupsState);
    $urlRouterProvider.otherwise("/login");
  }
})();
