/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .constant("LOGIN_ENDPOINT", "http://localhost:3000/login")
    .constant("PROPERTIES", "http://localhost:3000/api/v1/properties")
    .constant("INFO_USER", "http://localhost:3000/api/v1/info_users")
    .constant("USER_ROLES", "http://localhost:3000/api/v1/users_roles")
    .constant("NOTIFICATIONS", "http://localhost:3000/api/v1/notifications")
    .constant("USER", "http://localhost:3000/api/v1/users")
    .constant("INFO_PROPERTIES", "http://localhost:3000/api/v1/info_properties")
    .constant("PROPERTY_TYPES", "http://localhost:3000/api/v1/property_types")
    .constant("BRANCHES", "http://localhost:3000/api/v1/branches")
    .constant("BRANCHES_ROLES", "http://localhost:3000/api/v1/branch_roles")
    .constant("PROPERTIES", "http://localhost:3000/api/v1/properties");
})();
