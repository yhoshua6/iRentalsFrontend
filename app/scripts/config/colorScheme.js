/**
 * Created by jose- on 19/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .config(themeConfig);

  themeConfig.$inject = ["$mdThemingProvider"];
  function themeConfig($mdThemingProvider) {
    $mdThemingProvider
      .theme("default")
      .primaryPalette("light-blue", {
        "default" : "900"
      })
      .accentPalette("light-blue", {
        "default": "900"
      })
      .warnPalette("grey", {
        "default": "800"
      });
  }
})();
