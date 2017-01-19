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
      templateUrl: '/views/templates/home_tmpl.html'
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

    var rootAboutUsState = {
      name: 'root.aboutUs',
      url: 'about',
      templateUrl: '/views/home/about_us.html',
      controller: "AboutUsCtrl as aboutCtrl"
    };

    var rootLoginState = {
      name: 'root.login',
      url: 'login',
      templateUrl: '/views/home/login.html',
      controller: "loginCtrl as loginCtrl"
    };

    var dashboardRootstate = {

    };

    $stateProvider.state(rootState);
    $stateProvider.state(rootHomeState);
    $stateProvider.state(rootContactUsState);
    $stateProvider.state(rootAboutUsState);
    $stateProvider.state(rootLoginState);
    $urlRouterProvider.otherwise('/');
  }
})();
