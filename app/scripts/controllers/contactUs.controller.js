/**
 * Created by jose- on 07/01/2017.
 */
(function(){
  'use strict';

  angular.module("iRentalsApp")
    .controller("ContactUsCtrl", contactUsCtrl);


  function contactUsCtrl() {
    var contactScope = this;
    contactScope.userName = '';
    contactScope.userEmail = '';
    contactScope.userComments = '';
  }
})();
