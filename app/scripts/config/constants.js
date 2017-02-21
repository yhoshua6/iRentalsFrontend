/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .constant("LOGIN_ENDPOINT", "https://irentals.herokuapp.com/login")
    .constant("PROPERTIES_ENDPOINT", "https://irentals.herokuapp.com/properties")
    .constant("INFO_USER", "https://irentals.herokuapp.com/api/v1/info_users")
    .constant("USER_ROLES", "https://irentals.herokuapp.com/api/v1/users_roles")
    .constant("NOTIFICATIONS", "https://irentals.herokuapp.com/api/v1/notifications")
    .constant("USER", "https://irentals.herokuapp.com/api/v1/users")
    .constant("INFO_PROPERTIES", "https://irentals.herokuapp.com/api/v1/info_properties")
    .constant("PROPERTY_TYPES", "https://irentals.herokuapp.com/api/v1/property_types")
    .constant("BRANCHES", "https://irentals.herokuapp.com/api/v1/property_types")
    .constant("PROPERTIES", "https://irentals.herokuapp.com/api/v1/properties");
})();
