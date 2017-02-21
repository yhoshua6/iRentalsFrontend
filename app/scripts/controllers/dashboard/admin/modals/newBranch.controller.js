/**
 * Created by jose- on 07/02/2017.
 */
(function () {
  "use strict";
  // If we do not have CryptoJS defined; import it
  if (typeof CryptoJS == 'undefined') {
    var cryptoSrc = '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', cryptoSrc);
    document.body.appendChild(scriptTag);
  }
  angular.module("iRentalsApp")
    .controller("newBranchCtrl", newBranchCtrl);

  newBranchCtrl.$inject = ["$log", "$mdDialog", "requestService", "userInfoService", "USER"];
  function newBranchCtrl($log, $mdDialog, requestService, userInfoService, USER) {
    var newBranchScope = this;
    newBranchScope.title = "";
    newBranchScope.branchType = "";
    newBranchScope.propertyType = "";
    newBranchScope.propertyName = "";
    newBranchScope.senderUser = "";
    newBranchScope.receiverUser = "";

    newBranchScope.users = [];
    newBranchScope.branchName = "";
    newBranchScope.branchUrl = "";
    newBranchScope.filterSelected = true;

    var usersPromise = requestService.getPromise("GET", USER, null, userInfoService.user.authToken);
    usersPromise.then(function (response) {
      if (response.status === 200) {
        newBranchScope.users = response.data;
      }
    });

    newBranchScope.querySearchForUsers = function (criteria) {
      return criteria ? newBranchScope.users.filter(createFilterFor(criteria)) : [];
    };

    newBranchScope.save = function () {
      var newBranch = {
        title: newBranchScope.title,
        branchType: newBranchScope.branchType,
        propertyType: newBranchScope.propertyType,
        propertyName: newBranchScope.propertyName,
        senderUsr: newBranchScope.senderUser,
        receiverUser: newBranchScope.receiverUser
      };
      var branchesPromise = requestService.getPromise("POST", BRANCHES, requestService.formatData(newBranch), userInfoService.user.authToken);
      branchesPromise.then(function (response) {
        if (response.status === 200) {
          $mdDialog.hide(response.data);
        }
      });
    };

    newBranchScope.hide = function() {
      $mdDialog.hide();
    };

    newBranchScope.cancel = function() {
      $mdDialog.cancel();
    };

    newBranchScope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact.name.toLowerCase().indexOf(lowercaseQuery) != -1);
      };

    }
  }

})();
