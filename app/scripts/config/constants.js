/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  "use strict";
  angular.module("iRentalsApp")
    .constant("LOGIN_ENDPOINT", "https://irentalsapi.herokuapp.com/login")
    .constant("PROPERTIES_ENDPOINT", "http://localhost:3000/properties")
    .constant("INFO_USER_ENDPOINT", "https://irentalsapi.herokuapp.com/api/v1/info_users")
    .constant("USER_ROLE_ENDPOINT", "https://irentalsapi.herokuapp.com/api/v1/user_roles");

})();
