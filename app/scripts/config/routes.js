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
    .module('iRentalsFrontApp')
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function routesConfig($stateProvider, $urlRouterProvider) {
    /*
     var itemsState = {
     name: 'items',
     url: '/items/{categoryid}',
     templateUrl: 'ItemsView.html',
     controller: "ItemsController as itemDetail",
     resolve: {
     itemList: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
     return MenuDataService.getItemsForCategory($stateParams.categoryid);
     }]
     }
     };
     */

    $urlRouterProvider.otherwise('/');
  }
})();
