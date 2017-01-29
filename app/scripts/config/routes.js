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
      templateUrl: "/views/templates/home_template.html"
    };

    /*var rootContactUsState = {
      name: "root.contactUs",
      url: "contact",
      templateUrl: "/views/home/contact_us.html",
      controller: "ContactUsCtrl as contactCtrl"
    };*/

    var rootLoginState = {
      name: "root.login",
      url: "login",
      templateUrl: "/views/home/login.html",
      controller: "loginCtrl as loginCtrl"
    };

    var rootForbiddenUser = {
      name: "root.forbidden",
      url: "forbidden",
      templateUrl: "views/404.html"
    };

    var dashboardRootstate = {
      name: "dashboardRoot",
      abstract: true,
      url: "/dashboard",
      templateUrl: "/views/templates/dashboard_template.html",
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

    var dashboardHomestate = {
      name: "dashboardRoot.home",
      url: "/home",
      templateUrl: "/views/dashboard/dashboard.html",
      controller: "dashboardCtrl as dashCtrl"
    };

    var dashboardBillState = {
      name: "dashboardRoot.bills",
      url: "/bills",
      templateUrl: "/views/dashboard/bills.html",
      resolve: {
        isUserAlive: ["userInfoService", function (userInfoService) {
          return userInfoService.user.length > 0;
        }]
      },
      controller: "billsCtrl",
      controllerAs: 'billsCtrl'
    };

    var dashboardDocumentState = {
      name: "dashboardRoot.documents",
      url: "/documents",
      templateUrl: "/views/dashboard/documents.html",
      resolve: {
        isUserAlive: ["userInfoService", function (userInfoService) {
          return userInfoService.user.length > 0;
        }]
      },
      controller: "docsCtrl",
      controllerAs: "docsCtrl"
    };

    var dashboardGatheringState = {
      name: "dashboardRoot.gatherings",
      url: "/gatherings",
      templateUrl: "/views/dashboard/gatherings.html",
      resolve: {
        isUserAlive: ["userInfoService", function (userInfoService) {
          return userInfoService.user.length > 0;
        }]
      },
      controller: "gatheringsCtrl",
      controllerAs: "gatheringCtrl"
    };

    var dashboardReportsState = {
      name: "dashboardRoot.reports",
      url: "/reports",
      templateUrl: "/views/dashboard/reports.html",
      resolve: {
        isUserAlive: ["userInfoService", function (userInfoService) {
          return userInfoService.user.length > 0;
        }]
      },
      controller: "reportsCtrl",
      controllerAs: "reportsCtrl"
    };

    //Not logged
    $stateProvider.state(rootState);
    $stateProvider.state(rootLoginState);
    $stateProvider.state(rootForbiddenUser);
    //logged
    $stateProvider.state(dashboardRootstate);
    $stateProvider.state(dashboardHomestate);
    $stateProvider.state(dashboardBillState);
    $stateProvider.state(dashboardDocumentState);
    $stateProvider.state(dashboardGatheringState);
    $stateProvider.state(dashboardReportsState);
    $urlRouterProvider.otherwise("/login");
  }
})();
