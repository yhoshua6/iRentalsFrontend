/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .service('toastServices', toastServices);

  toastServices.$inject = ['$mdToast'];
  function toastServices($mdToast) {
    var toastScope = this;

    toastScope.showSimpleToast = function() {
      $mdToast.show({
        templateUrl: '../../views/toasts/login_success.html',
        hideDelay: 3500,
        position: "top right"
      });
    };

    toastScope.showSuccessfulSentEmail = function () {
      $mdToast.show({
        templateUrl: '../../views/toasts/successful_sent_email.html',
        hideDelay: 3500,
        position: "top right"
      });
    }

    toastScope.showFailureSentEmail = function () {
      $mdToast.show({
        templateUrl: '../../views/toasts/failure_sent_email.html',
        hideDelay: 3500,
        position: "top right"
      });
    }
  }
})();


/*
 var last = {
 bottom: false,
 top: true,
 left: false,
 right: true
 };

 toastScope.toastPosition = angular.extend({},last);

 toastScope.getToastPosition = function() {
 sanitizePosition();
 return Object.keys(toastScope.toastPosition).filter(
 function(pos) {
 return toastScope.toastPosition[pos];
 }
 ).join(' ');
 };

 function sanitizePosition() {
 var current = toastScope.toastPosition;

 if ( current.bottom && last.top ) current.top = false;
 if ( current.top && last.bottom ) current.bottom = false;
 if ( current.right && last.left ) current.left = false;
 if ( current.left && last.right ) current.right = false;

 last = angular.extend({},current);
 }

 var pinTo = toastScope.getToastPosition();

 $mdToast.simple()
 .textContent(action)
 .position(pinTo )
 .hideDelay(4000)
 */
