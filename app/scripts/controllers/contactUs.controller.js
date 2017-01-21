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
    contactScope.isSending = false;

    contactScope.sendComments = function (userName, userEmail, userComments) {
      var userComment = {
        "userName" : userName,
        "userEmail" : userEmail,
        "userComments" : userComments
      };
      var commentPromise = requestService.getCommentPromise(userComment);
      commentPromise.then(function (response) {
          $log.log(response);
        },
        function (error) {
          $log.log(error);
        }
      );
    };

  }
})();
