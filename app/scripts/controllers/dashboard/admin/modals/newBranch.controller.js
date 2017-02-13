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

  newBranchCtrl.$inject = ["$log", "$mdDialog"];
  function newBranchCtrl($log, $mdDialog) {
    var newBranchScope = this;
    newBranchScope.title = "";
    newBranchScope.branchType = "";
    newBranchScope.propertyType = "";
    newBranchScope.propertyName = "";
    newBranchScope.senderUser = "";
    newBranchScope.receiverUser = "";

    newBranchScope.admins = [
      { id: 1, name: "Mariana", image: "https://s-media-cache-ak0.pinimg.com/564x/26/77/f0/2677f034c4b14ccb92fd202bd5ca0142.jpg"},
      { id: 2, name: "Jose", image: "https://s-media-cache-ak0.pinimg.com/564x/26/77/f0/2677f034c4b14ccb92fd202bd5ca0142.jpg"},
      { id: 3, name: "Gabriel", image: "https://s-media-cache-ak0.pinimg.com/564x/26/77/f0/2677f034c4b14ccb92fd202bd5ca0142.jpg"},
      { id: 4, name: "Rodo", image: "https://s-media-cache-ak0.pinimg.com/564x/26/77/f0/2677f034c4b14ccb92fd202bd5ca0142.jpg"},
      { id: 5, name: "Edgar", image: "https://s-media-cache-ak0.pinimg.com/564x/26/77/f0/2677f034c4b14ccb92fd202bd5ca0142.jpg"}
    ];
    newBranchScope.users = [
      { id: 1, name: "Andrea", image: "http://static.srcdn.com/wp-content/uploads/stormtrooper.jpg"},
      { id: 2, name: "Alicia", image: "http://static.srcdn.com/wp-content/uploads/stormtrooper.jpg"},
      { id: 3, name: "Melissa", image: "http://static.srcdn.com/wp-content/uploads/stormtrooper.jpg"},
      { id: 4, name: "Jessica", image: "http://static.srcdn.com/wp-content/uploads/stormtrooper.jpg"},
      { id: 5, name: "Ilse", image: "http://static.srcdn.com/wp-content/uploads/stormtrooper.jpg"}
    ];
    newBranchScope.branchName = "";
    newBranchScope.branchUrl = "";
    newBranchScope.filterSelected = true;

    newBranchScope.querySearchForUsers = function (criteria) {
      return criteria ? newBranchScope.users.filter(createFilterFor(criteria)) : [];
    };

    newBranchScope.querySearchForAdmins = function (criteria) {
      return criteria ? newBranchScope.admins.filter(createFilterFor(criteria)) : [];
    };

    newBranchScope.save = function () {
      var newBranch = {
        id: 0,
        title: newBranchScope.title,
        branchType: newBranchScope.branchType,
        propertyType: newBranchScope.propertyType,
        propertyName: newBranchScope.propertyName,
        senderUsr: newBranchScope.senderUser,
        receiverUser: newBranchScope.receiverUser
      };
      $mdDialog.hide(newBranch);
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
