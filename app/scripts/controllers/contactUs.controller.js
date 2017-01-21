/**
 * Created by jose- on 07/01/2017.
 */
(function(){
  'use strict';

  angular.module("iRentalsApp")
    .controller("ContactUsCtrl", contactUsCtrl);

  contactUsCtrl.$inject = ["$log", "requestService", "toastServices"];
  function contactUsCtrl($log, requestService, toastServices) {
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
          toastServices.showSuccessfulSentEmail();
        },
        function (error) {
          //$log.log(error);
          toastServices.showFailureSentEmail();
        }
      );
    };

  }
})();
