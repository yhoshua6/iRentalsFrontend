/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .constant('LOGIN_URL', "https://irentalsapi.herokuapp.com/login")
    .constant('PROPERTIES_URL', "https://irentalsapi.herokuapp.com/properties")
    .constant('SEND_COMMENTS_TO_ADMIN',"https://irentalsapi.herokuapp.com/send_comments")
    .constant('GET_USER_INFO', "https://irentalsapi.herokuapp.com/api/v1/users_infos")
    .constant('GET_USER_ROLE', "https://irentalsapi.herokuapp.com/api/v1/user_roles")
    .constant('GET_FILES_DEPOT', "https://irentalsapi.herokuapp.com/api/v1/files_depots");

})();
