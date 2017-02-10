/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .constant("LOGIN_ENDPOINT", "https://localhost:3000/login")
    .constant("PROPERTIES_ENDPOINT", "https://localhost:3000/properties")
    .constant("INFO_USER_ENDPOINT", "https://localhost:3000/api/v1/info_users")
    .constant("USER_ROLE_ENDPOINT", "https://localhost:3000/api/v1/user_roles")
    .constant("USER_NOTIFICATIONS", "https://localhost:3000/api/v1/notifications")
    .constant("USER_ALERTS", "https://localhost:3000/api/v1/alerts")
    .constant("GROUP_ADMINS", "https://localhost:3000/api/v1/groups_admins")
    .constant("GROUPS", "https://localhost:3000/api/v1/groups");
})();
