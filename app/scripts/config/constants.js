/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .constant("LOGIN_ENDPOINT", "https://chromabackend.herokuapp.com/login")
    .constant("PROPERTIES", "https://chromabackend.herokuapp.com/api/v1/properties")
    .constant("INFO_USER", "https://chromabackend.herokuapp.com/api/v1/info_users")
    .constant("USER_ROLES", "https://chromabackend.herokuapp.com/api/v1/users_roles")
    .constant("NOTIFICATIONS", "https://chromabackend.herokuapp.com/api/v1/notifications")
    .constant("NOTIFICATIONS_ROLES", "https://chromabackend.herokuapp.com/api/v1/notifications_roles")
    .constant("USER", "https://chromabackend.herokuapp.com/api/v1/users")
    .constant("INFO_PROPERTIES", "https://chromabackend.herokuapp.com/api/v1/info_properties")
    .constant("PROPERTY_TYPES", "https://chromabackend.herokuapp.com/api/v1/property_types")
    .constant("BRANCHES", "https://chromabackend.herokuapp.com/api/v1/branches")
    .constant("BRANCHES_ROLES", "https://chromabackend.herokuapp.com/api/v1/branch_roles")
    .constant("PROPERTIES", "https://chromabackend.herokuapp.com/api/v1/properties");
})();
