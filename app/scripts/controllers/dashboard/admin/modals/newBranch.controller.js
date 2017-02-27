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

  newBranchCtrl.$inject = ["$log", "$mdDialog", "requestService", "userInfoService", "USER", "PROPERTY_TYPES", "INFO_PROPERTIES"];
  function newBranchCtrl($log, $mdDialog, requestService, userInfoService, USER, PROPERTY_TYPES, INFO_PROPERTIES) {
    var newBranchScope = this;
    newBranchScope.title = "";
    newBranchScope.branchType = "";
    newBranchScope.propertyType = "";
    newBranchScope.properties = [];
    newBranchScope.property = {};
    newBranchScope.receiverUser = "";
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
      $log.log("users////////////////////", response);
      if (response.status === 200) {
        newBranchScope.users = response.data;
      }
    });

    var propertiesPromise = requestService.getPromise("GET", INFO_PROPERTIES, null, userInfoService.user.authToken);
    usersPromise.then(function (response) {
      $log.log("properties////////////////////", response);
      if (response.status === 200) {
        newBranchScope.properties = response.data;
      }
    });

    var propertiesTypes = requestService.getPromise("GET", PROPERTY_TYPES, null, userInfoService.user.authToken);
    propertiesTypes.then(function (response) {
      $log.log("types props////////////////////", response);
      if (response.status === 200) {
        usersPromise.propertiesType = response.data;
      }
    });

    newBranchScope.querySearchForUsers = function (criteria) {
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
          property_type_id: newBranchScope.propertyType,
          property_id: newBranchScope.property.id,
        },
        branch_role: {
          sender_id: userInfoService.user.id,
          receiver_id: newBranchScope.receiverUser.id
        }
      };
      $log.log(newBranch);
      var branchesPromise = requestService.getPromise("POST", BRANCHES, requestService.formatData(newBranch), userInfoService.user.authToken);
      branchesPromise.then(function (response) {
        if (response.status === 200) {
          newBranch.branch_role.branch_id = response.data.id;
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
