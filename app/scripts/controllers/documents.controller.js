/**
 * Created by jose- on 20/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .controller('docsCtrl', docsCtrl);


  docsCtrl.$inject = ['$mdDialog', 'requestService'];
  function docsCtrl($mdDialog, requestService) {
    var docsScope = this;
    docsScope.openMenu = function($mdOpenMenu, ev) {
      docsScope = ev;
      $mdOpenMenu(ev);
    };

    docsScope.notificationsEnabled = true;
    docsScope.toggleNotifications = function() {
      docsScope.notificationsEnabled = !docsScope.notificationsEnabled;
    };

    docsScope.redial = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(docsScope)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Suddenly, a redial')
          .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
          .ok('That was easy')
      );
      docsScope = null;
    };

    docsScope.checkVoicemail = function() {
      // This never happens.
    };
  }
})();
