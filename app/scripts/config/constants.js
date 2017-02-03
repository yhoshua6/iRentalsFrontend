/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .constant("LOGIN_ENDPOINT", "http://localhost:3000/login")
    .constant("PROPERTIES_ENDPOINT", "http://localhost:3000/properties")
    .constant("INFO_USER_ENDPOINT", "http://localhost:3000/api/v1/info_users")
    .constant("USER_ROLE_ENDPOINT", "http://localhost:3000/api/v1/user_roles")
    .constant("USER_NOTIFICATIONS", "http://localhost:3000/api/v1/notifications")
    .constant("USER_ALERTS", "http://localhost:3000/api/v1/alerts")
    .constant("GROUP_ADMINS", "http://localhost:3000/api/v1/groups_admins")
    .constant("GROUPS", "http://localhost:3000/api/v1/groups");
})();
