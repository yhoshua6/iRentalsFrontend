/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .constant("LOGIN_ENDPOINT", "https://irentalsapi.herokuapp.com/login")
    .constant("PROPERTIES_ENDPOINT", "https://irentalsapi.herokuapp.com/properties")
    .constant("INFO_USER_ENDPOINT", "https://irentalsapi.herokuapp.com/api/v1/info_users")
    .constant("USER_ROLE_ENDPOINT", "https://irentalsapi.herokuapp.com/api/v1/user_roles")
    .constant("USER_NOTIFICATIONS", "https://irentalsapi.herokuapp.com/api/v1/notifications")
    .constant("USER_ALERTS", "https://irentalsapi.herokuapp.com/api/v1/alerts")
    .constant("GROUP_ADMINS", "https://irentalsapi.herokuapp.com/api/v1/groups_admins")
    .constant("GROUPS", "https://irentalsapi.herokuapp.com/api/v1/groups");
})();
