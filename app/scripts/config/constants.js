/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .constant("LOGIN_ENDPOINT", "https://chromabackend.herokuapp.com/login")
    .constant("USER", "https://chromabackend.herokuapp.com/api/v1/users")
    .constant("INFO_USER", "https://chromabackend.herokuapp.com/api/v1/info_users")
    .constant("NOTIFICATIONS", "https://chromabackend.herokuapp.com/api/v1/notifications")
    .constant("NOTIFICATIONS_ROLES", "https://chromabackend.herokuapp.com/api/v1/notifications_roles")
    .constant("PROPERTIES", "https://chromabackend.herokuapp.com/api/v1/properties")
    .constant("INFO_PROPERTIES", "https://chromabackend.herokuapp.com/api/v1/info_properties")
    .constant("PROPERTY_TYPES", "https://chromabackend.herokuapp.com/api/v1/property_types")
    .constant("BRANCHES", "https://chromabackend.herokuapp.com/api/v1/branches")
    .constant("GROUP_USERS", "https://chromabackend.herokuapp.com/api/v1/groups_users")
    .constant("GROUPS", "https://chromabackend.herokuapp.com/api/v1/groups")
    .constant("FILES_DEPOT", "https://chromabackend.herokuapp.com/api/v1/depot_files")
    .constant("SUCCESSFUL_LOGIN", "../../views/toasts/login_success.html")
    .constant("SUCCESFUL_SENT_EMAIL", "../../views/toasts/successful_sent_email.html")
    .constant("FAILURE_LOGIN", "../../views/toasts/login_failure.html")
    .constant("FAILURE_SENT_EMAIL", "../../views/toasts/failure_sent_email.html")
    .constant("SERVER_ERROR", "../../views/toasts/server_error.html");
})();
