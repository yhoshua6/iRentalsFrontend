/**
 * Created by jose- on 04/02/2017.
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
    .controller("newGroupCtrl", newGroupCtrl);


  newGroupCtrl.$inject = ["$log", "$mdDialog"];
  function newGroupCtrl($log, $mdDialog) {
    var newGroupScope = this;
    newGroupScope.admins = [
      { id: 1, name: "Mariana", image: "https://s-media-cache-ak0.pinimg.com/564x/26/77/f0/2677f034c4b14ccb92fd202bd5ca0142.jpg"},
      { id: 2, name: "Jose", image: "https://s-media-cache-ak0.pinimg.com/564x/26/77/f0/2677f034c4b14ccb92fd202bd5ca0142.jpg"},
      { id: 3, name: "Gabriel", image: "https://s-media-cache-ak0.pinimg.com/564x/26/77/f0/2677f034c4b14ccb92fd202bd5ca0142.jpg"},
      { id: 4, name: "Rodo", image: "https://s-media-cache-ak0.pinimg.com/564x/26/77/f0/2677f034c4b14ccb92fd202bd5ca0142.jpg"},
      { id: 5, name: "Edgar", image: "https://s-media-cache-ak0.pinimg.com/564x/26/77/f0/2677f034c4b14ccb92fd202bd5ca0142.jpg"}
    ];
    newGroupScope.users = [
      { id: 1, name: "Andrea", image: "http://static.srcdn.com/wp-content/uploads/stormtrooper.jpg"},
      { id: 2, name: "Alicia", image: "http://static.srcdn.com/wp-content/uploads/stormtrooper.jpg"},
      { id: 3, name: "Melissa", image: "http://static.srcdn.com/wp-content/uploads/stormtrooper.jpg"},
      { id: 4, name: "Jessica", image: "http://static.srcdn.com/wp-content/uploads/stormtrooper.jpg"},
      { id: 5, name: "Ilse", image: "http://static.srcdn.com/wp-content/uploads/stormtrooper.jpg"}
    ];
    newGroupScope.groupName = "";
    newGroupScope.groupUrl = "";
    newGroupScope.groupAdmins = [];
    newGroupScope.groupUsers = [];
    newGroupScope.filterSelected = true;

    newGroupScope.querySearchForUsers = function (criteria) {
      return criteria ? newGroupScope.users.filter(createFilterFor(criteria)) : [];
    };

    newGroupScope.querySearchForAdmins = function (criteria) {
      return criteria ? newGroupScope.admins.filter(createFilterFor(criteria)) : [];
    };


    newGroupScope.hide = function() {
      $mdDialog.hide();
    };

    newGroupScope.cancel = function() {
      $mdDialog.cancel();
    };

    newGroupScope.answer = function(answer) {
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
