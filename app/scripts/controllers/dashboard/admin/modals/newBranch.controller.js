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

  newBranchCtrl.$inject = ["$log", "$mdDialog", "requestService", "userInfoService", "USER", "PROPERTY_TYPES", "INFO_PROPERTIES", "BRANCHES"];
  function newBranchCtrl($log, $mdDialog, requestService, userInfoService, USER, PROPERTY_TYPES, INFO_PROPERTIES, BRANCHES) {
    var newBranchScope = this;
    newBranchScope.title = "";
    newBranchScope.branchType = "";
    newBranchScope.propertyType = "";
    newBranchScope.properties = [];
    newBranchScope.selectedProperty = "";
    newBranchScope.selectedOwner = "";
    newBranchScope.users = [];
    newBranchScope.filterSelected = true;
    newBranchScope.branchOptions = [
      {id: 1, type: "Facturas"},
      {id: 2, type: "Reportes"},
      {id: 3, type: "Documentos"},
      {id: 4, type: "Asambleas"},
    ];

    var usersPromise = requestService.getPromise("GET", USER, null, userInfoService.user.authToken);
    usersPromise.then(function (response) {
      if (response.status === 200) {
        newBranchScope.users = response.data;
      }
    });

    var propertiesPromise = requestService.getPromise("GET", INFO_PROPERTIES, null, userInfoService.user.authToken);
    usersPromise.then(function (response) {
      if (response.status === 200) {
        newBranchScope.properties = response.data;
      }
    });

    var propertiesTypes = requestService.getPromise("GET", PROPERTY_TYPES, null, userInfoService.user.authToken);
    propertiesTypes.then(function (response) {
      if (response.status === 200) {
        newBranchScope.propertiesType = response.data;
      }
    });

    newBranchScope.querySearchForOwners = function (criteria) {
      return criteria ? newBranchScope.users.filter(createFilterFor(criteria)) : [];
    };

    newBranchScope.querySearchForProperties = function (criteria) {
      return criteria ? newBranchScope.properties.filter(createFilterFor(criteria)) : [];
    };

    newBranchScope.save = function () {
      var newBranch = {
        branch: {
          title: newBranchScope.title,
          branch_type: newBranchScope.branchType,
          property_type: newBranchScope.propertyType,
          property_id: newBranchScope.selectedProperty.id,
          sender_name: "test",
          receiver_name: "receiver"
        },
        branch_role: {
          sender_id: userInfoService.user.id,
          receiver_id: newBranchScope.selectedOwner.id
        }
      };
      var branchesPromise = requestService.getPromise("POST", BRANCHES, requestService.formatData(newBranch), userInfoService.user.authToken);
      branchesPromise.then(function (response) {
        if (response.status === 201) {
          newBranch.branch_role.branch_id = response.data.id;
          $mdDialog.hide(newBranch);
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
         return (contact.user.toLowerCase().indexOf(lowercaseQuery) != -1);
       };

     }
  }

})();
