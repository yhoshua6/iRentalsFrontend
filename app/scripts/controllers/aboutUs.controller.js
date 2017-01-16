/**
 * Created by jose- on 07/01/2017.
 */
(function () {
  'use strict';

  angular.module('iRentalsApp')
    .controller("AboutUsCtrl", aboutUsCtrl);


  function aboutUsCtrl() {
    var aboutScope = this;

    aboutScope.companyGoals = [
      {goal: "First goal of the company"},
      {goal: "Second goal of the company"},
      {goal: "Third goal of the company"},
      {goal: "Fourth goal of the company"}
    ];
  }
})();
