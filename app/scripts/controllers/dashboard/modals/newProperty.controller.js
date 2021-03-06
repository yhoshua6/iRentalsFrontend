/**
 * Created by jose- on 05/02/2017.
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
    .controller("newPropertyCtrl", newPropertyCtrl);

  newPropertyCtrl.$inject = ["$log", "$mdDialog", "userInfoService", "requestService", "USER", "INFO_PROPERTIES", "PROPERTY_TYPES"];
  function newPropertyCtrl($log, $mdDialog, userInfoService, requestService, USER, INFO_PROPERTIES, PROPERTY_TYPES) {
    var newPropertyScope = this;
    newPropertyScope.name = "";
    newPropertyScope.description = "";
    newPropertyScope.surfaceTotal = "";
    newPropertyScope.surfaceIn = "";
    newPropertyScope.surfaceOut = "";
    newPropertyScope.notes = "";
    newPropertyScope.owners = [];
    newPropertyScope.filterSelected = true;
    newPropertyScope.selectedOwner;
    newPropertyScope.propertyType = "";

    var ownersPromise = requestService.getPromise("GET", USER, null, userInfoService.user.authToken);
    ownersPromise.then(function (response) {
      if (response.status === 200) {
        newPropertyScope.owners = response.data;
      }
    });

    var propertiesTypes = requestService.getPromise("GET", PROPERTY_TYPES, null, userInfoService.user.authToken);
    propertiesTypes.then(function (response) {
      if (response.status === 200) {
        $log.log(response.data)
        newPropertyScope.propertiesType = response.data;
      }
    });

    newPropertyScope.querySearchForOwners = function (criteria) {
      return criteria ? newPropertyScope.owners.filter(createFilterFor(criteria)) : [];
    };

    newPropertyScope.hide = function() {
      $mdDialog.hide();
    };

    newPropertyScope.cancel = function() {
      $mdDialog.cancel();
    };

    newPropertyScope.save = function() {
      var newProperty = {
        info_property: {
          property_type: newPropertyScope.propertyType.type,
          name: newPropertyScope.name,
          description: newPropertyScope.description,
          surface_total: newPropertyScope.surfaceTotal,
          surface_in: newPropertyScope.surfaceIn,
          surface_out: newPropertyScope.surfaceOut,
          notes: newPropertyScope.notes
        },
        property:{
          user_id: newPropertyScope.selectedOwner.id,
          property_type_id: newPropertyScope.propertyType.id
        }

      };
      var propertyInfo = requestService.getPromise("POST", INFO_PROPERTIES, requestService.formatData(newProperty), userInfoService.user.authToken);
      propertyInfo.then(function (response) {
        if (response.status === 201) {
          newProperty.property.property_info_id = response.data.id;
          newProperty.info_property.property_type = newPropertyScope.propertyType;
          newProperty.info_property.id = response.data.id;
          $mdDialog.hide(newProperty)
        }
      });
    };

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact.user.toLowerCase().indexOf(lowercaseQuery) != -1);
      };

    }
  }
})();
