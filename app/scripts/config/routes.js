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
    /*
     resolve: {
     itemList: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
     return MenuDataService.getItemsForCategory($stateParams.categoryid);
     }]
     }
     };
     */

    var loginState = {
      name: 'login',
      url: '/login',
      templateUrl: '/views/login.html',
      controller: "loginCtrl as loginCtrl"
    };

    var contactUsState = {
      name: 'contactUs',
      url: '/contact',
      templateUrl: '/views/contact_us.html',
      controller: "ContactUsCtrl as contactCtrl"
    };

    var aboutUsState = {
      name: 'aboutUs',
      url: '/about',
      templateUrl: '/views/about_us.html',
      controller: "AboutUsCtrl as aboutCtrl"
    };

    var homeState = {
      name: 'home',
      url: '/',
      templateUrl: '/views/main.html',
      controller: "MainCtrl as mainCtrl"
    };

    $stateProvider.state(loginState);
    $stateProvider.state(contactUsState);
    $stateProvider.state(aboutUsState);
    $stateProvider.state(homeState);
    $urlRouterProvider.otherwise('/');
  }
})();
