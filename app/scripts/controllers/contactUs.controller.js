/**
 * Created by jose- on 07/01/2017.
 */
(function(){
  'use strict';

  angular.module("iRentalsApp")
    .controller("ContactUsCtrl", contactUsCtrl);

  contactUsCtrl.$inject = ["$log", "requestService"];
  function contactUsCtrl($log, requestService) {
    var contactScope = this;
    contactScope.userName = '';
    contactScope.userEmail = '';
    contactScope.userComments = '';

    contactScope.sendComments = function () {
      var userComment = {
        "userName" : contactScope.userName,
        "userEmail" : contactScope.userEmail,
        "userComments" : contactScope.userComments
      };
      var commentPromise = requestService.getCommentPromise(userComment);
      commentPromise.then(successResponse(response), failure(error));
    };

    function successResponse(response){
      $log.log(response);
    }

    function failure(error) {
      $log.log(error);
    }
  }
})();
