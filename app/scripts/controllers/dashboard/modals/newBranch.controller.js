/**
 * Created by jose- on 07/02/2017.
 */
(function () {
  "use strict";
  // If we do not have CryptoJS defined; import it
  if (typeof CryptoJS) {
    var cryptoSrc = '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', cryptoSrc);
    document.body.appendChild(scriptTag);
  }
  angular.module("iRentalsApp")
    .controller("newBranchCtrl", newBranchCtrl);

  newBranchCtrl.$inject = ["$mdDialog", "requestService", "userInfoService", "toastServices", "USER", "PROPERTY_TYPES", "INFO_PROPERTIES", "BRANCHES", "BRANCHES_ROLES"];
  function newBranchCtrl($mdDialog, requestService, userInfoService, toastServices, USER, PROPERTY_TYPES, INFO_PROPERTIES, BRANCHES, BRANCHES_ROLES) {
    var newBranchScope = this;
    newBranchScope.title = "";
    newBranchScope.branchType = "";
    newBranchScope.propertyType = "";
    newBranchScope.properties = [];
    newBranchScope.selectedProperty;
    newBranchScope.receiverUser;
    newBranchScope.senderUser;
    newBranchScope.users = [];
    newBranchScope.filterSelected = true;
    newBranchScope.branchOptions = [
      {id: 1, type: "Facturas"},
      {id: 2, type: "Reportes"},
      {id: 3, type: "Documentos"},
      {id: 4, type: "Asambleas"},
      {id: 5, type: "Comprobantes"}
    ];

    var usersPromise = requestService.getPromise("GET", USER, null, userInfoService.user.authToken);
    usersPromise.then(function (response) {
      if (response.status === 200) {
        newBranchScope.users = response.data;
      }
    });

    var propertiesPromise = requestService.getPromise("GET", INFO_PROPERTIES, null, userInfoService.user.authToken);
    propertiesPromise.then(function (response) {
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

    newBranchScope.querySearchForUsers = function (criteria) {
      return criteria ? newBranchScope.users.filter(createFilterFor(criteria)) : [];
    };

    newBranchScope.querySearchForProperties = function (criteria) {
      return criteria ? newBranchScope.properties.filter(createFilterPropertyFor(criteria)) : [];
    };
    usersPromise.then(function (response) {
      if (response.status === 200) {
          angular.forEach(response.data, function(value) {
              value.selectR = false;
              value.selectS = false;
          });
          newBranchScope.myUsers = response.data;
      }
    });

    newBranchScope.selectUsers = function (thisone, wichone){
        angular.forEach(newBranchScope.myUsers, function(value) {
            if(wichone === 'Receiver' && value.role === thisone){
                if(value.selectR == true){
                    value.selectR = false;
                }else{
                    value.selectR = true;
                }
            }
            if(wichone === 'Sender' && value.role === thisone){
                if(value.selectS == true){
                    value.selectS = false;
                }else{
                    value.selectS = true;
                }
            }
        });
    };

    newBranchScope.save = function () {
        var newBranch = {
            branch: {
                title: newBranchScope.title,
                branch_type: newBranchScope.branchType,
                property_id: newBranchScope.selectedProperty.property_id
            }
        };
        var branchesPromise = requestService.getPromise("POST", BRANCHES, requestService.formatData(newBranch), userInfoService.user.authToken);         branchesPromise.then(function (response) {
            if (response.status === 201) {
                angular.forEach(newBranchScope.myUsers, function(x) {
                    if(x.selectS==true){
                        angular.forEach(newBranchScope.myUsers, function(y) {
                            if(y.selectR==true){
                                var newBranchRole = {
                                    branches_role: {
                                        branch_id: response.data.id,
                                        sender_id: x.id,
                                        receiver_id: y.id,
                                        branch_type: newBranchScope.branchType,
                                    }
                                };
                                var branchesRolesPromise = requestService.getPromise("POST", BRANCHES_ROLES, requestService.formatData(newBranchRole), userInfoService.user.authToken);
                                  branchesRolesPromise.then(function (response) {
                                    if (response.status === 201) {
                                      toastServices.toastIt(response.status, "create_record");
                                    }
                                  });
                            }
                        });
                    }
                });
                $mdDialog.hide();
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

     function createFilterPropertyFor(query) {
       var lowercaseQuery = angular.lowercase(query);

       return function filterFn(contact) {
         return (contact.name.toLowerCase().indexOf(lowercaseQuery) != -1);
       };
     }
  }

})();
