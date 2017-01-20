/**
 * Created by jose- on 04/01/2017.
 */
(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name iRentalsFrontApp
   * @description
   * # iRentalsFrontApp
   *
   * Routes configuration file.
   */
  angular
    .module('iRentalsApp')
    .config(routesConfig);
  routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function routesConfig($stateProvider, $urlRouterProvider) {

    var rootState = {
      name: 'root',
      abstract: true,
      url: '/',
      templateUrl: '/views/templates/home_template.html'
    };

    var rootHomeState = {
      name: 'root.home',
      url: 'home',
      templateUrl: '/views/home/main.html',
      controller: "MainCtrl as mainCtrl"
    };

    var rootContactUsState = {
      name: 'root.contactUs',
      url: 'contact',
      templateUrl: '/views/home/contact_us.html',
      controller: "ContactUsCtrl as contactCtrl"
    };

    var rootLoginState = {
      name: 'root.login',
      url: 'login',
      templateUrl: '/views/home/login.html',
      controller: "loginCtrl as loginCtrl"
    };

    var dashboardRootstate = {
      name: 'dashboardRoot',
      abstract: true,
      url: '/',
      templateUrl: '/views/templates/dashboard_template.html'
    };

    var dashboardHomestate = {
      name: 'dashboardRoot.home',
      url: 'dashboard',
      templateUrl: '/views/dashboard/dashboard.html',
      controller: "dashboardCtrl as dashCtrl"
    };

    var dashboardBillState = {
      name: 'dashboardRoot.bills',
      url: 'bills',
      templateUrl: '/views/dashboard/bills.html'
    };

    var dashboardDocumentState = {
      name: 'dashboardRoot.documents',
      url: 'documents',
      templateUrl: '/views/dashboard/documents.html'
    };

    var dashboardGatheringState = {
      name: 'dashboardRoot.gatherings',
      url: 'gatherings',
      templateUrl: '/views/dashboard/gatherings.html'
    };

    var dashboardReportsState = {
      name: 'dashboardRoot.reports',
      url: 'reports',
      templateUrl: '/views/dashboard/reports.html'
    };

    //Not logged
    $stateProvider.state(rootState);
    $stateProvider.state(rootHomeState);
    $stateProvider.state(rootContactUsState);
    $stateProvider.state(rootLoginState);
    //logged
    $stateProvider.state(dashboardRootstate);
    $stateProvider.state(dashboardHomestate);
    $stateProvider.state(dashboardBillState);
    $stateProvider.state(dashboardDocumentState);
    $stateProvider.state(dashboardGatheringState);
    $stateProvider.state(dashboardReportsState);
    $urlRouterProvider.otherwise('/home');
  }
})();
