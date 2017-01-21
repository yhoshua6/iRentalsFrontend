/**
 * Created by jose- on 19/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .config(themeConfig);

  themeConfig.$inject = ['$mdThemingProvider'];
  function themeConfig($mdThemingProvider) {
    $mdThemingProvider
      .theme('default')
      .dark()
      .primaryPalette('blue-grey', {
        'default' : '500'
      })
      .accentPalette('teal', {
        'default': '500'
      });
  }
})();
