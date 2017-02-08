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
      templateUrl: "/views/templates/dashboard_admin_template.html",
      resolve: {
        gotUserInfo: [
          "$log",
          "INFO_USER_ENDPOINT",
          "requestService",
          "userInfoService",
          "USER_ROLE_ENDPOINT",
          function ($log, INFO_USER_ENDPOINT, requestService, userInfoService, USER_ROLE_ENDPOINT) {
            if (!userInfoService.user.authToken) { return false; }
            var INFO_USER = INFO_USER_ENDPOINT + "/" + userInfoService.user.infoId;
            var userPromise = requestService.getPromise("GET", INFO_USER, null, userInfoService.user.authToken);
            return userPromise.then(function (response) {
              var userInfo = response.data;
              userInfoService.user.id = userInfo.user_id;
              userInfoService.user.name = userInfo.first_name + " " + userInfo.last_name;
              userInfoService.user.bankAccount = userInfo.bank_account;
              userInfoService.user.bankClabe = userInfo.bank_clabe;
              userInfoService.user.bankName = userInfo.bank_name;
              userInfoService.user.cedula = userInfo.cedula;
              userInfoService.user.cellPhone = userInfo.cell_phone;
              userInfoService.user.isPartOfPool = userInfo.is_part_of_pool;
              userInfoService.user.paymentMethod = userInfo.payment_method;
              var ROLE_ENDPOINT = USER_ROLE_ENDPOINT + "/" + userInfoService.user.roleId;
              var rolePromise = requestService.getPromise("GET", ROLE_ENDPOINT, null, userInfoService.user.authToken);
              rolePromise.then(function (response) {
                userInfoService.user.role = response.data.role;
                return true;
              }).catch(function (error) {
                return false;
              });
              return true;
            }).catch(function (error) {
              return false;
            });
          }
        ]
      }
    };

    var adminHomeState = {
      name: "adminRoot.home",
      url: "home",
      templateUrl: "/views/dashboard/home.html",
      resolve: {
        gotNotifications: [
          "$log",
          "USER_NOTIFICATIONS",
          "requestService",
          "userInfoService",
          function ($log, USER_NOTIFICATIONS, requestService, userInfoService) {
            var NOTIFICATION_ENDPOINT = USER_NOTIFICATIONS + "/" + userInfoService.user.id;
            var notifications = requestService.getPromise("GET", NOTIFICATION_ENDPOINT, null, userInfoService.user.authToken);
            notifications.then(function (response) {
              $log.log(response, "notificatioooons");
            }).catch(function (error) {

              return false;
            })
          }
        ]
      }
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



    $stateProvider.state(rootState);
    $stateProvider.state(rootLoginState);
    $stateProvider.state(adminRootState);
    $stateProvider.state(adminHomeState);
    $stateProvider.state(adminGroupState);
    $stateProvider.state(adminPropertiesState);
    $stateProvider.state(adminUsersState);
    $stateProvider.state(adminNotificationsState);
    $stateProvider.state(adminBranchesState);
    $urlRouterProvider.otherwise("/login");
  }
})();
