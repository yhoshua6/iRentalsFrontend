/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .constant("LOGIN_ENDPOINT", "http://localhost:3000/login")
    .constant("USER", "http://localhost:3000/api/v1/users")
    .constant("INFO_USER", "http://localhost:3000/api/v1/info_users")
    .constant("NOTIFICATIONS", "http://localhost:3000/api/v1/notifications")
    .constant("NOTIFICATIONS_ROLES", "http://localhost:3000/api/v1/notifications_roles")
    .constant("PROPERTIES", "http://localhost:3000/api/v1/properties")
    .constant("INFO_PROPERTIES", "http://localhost:3000/api/v1/info_properties")
    .constant("PROPERTY_TYPES", "http://localhost:3000/api/v1/property_types")
    .constant("BRANCHES", "http://localhost:3000/api/v1/branches")
    .constant("BRANCHES_ROLES", "http://localhost:3000/api/v1/branches_roles")
    .constant("GROUP_USERS", "http://localhost:3000/api/v1/groups_users")
    .constant("GROUPS", "http://localhost:3000/api/v1/groups")
    .constant("FILES_DEPOT", "http://localhost:3000/api/v1/depot_files")
    .constant("FORGOT_PWD", "http://localhost:3000/forgot_password");
})();
