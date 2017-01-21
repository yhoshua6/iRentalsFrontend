/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .constant('LOGIN_URL', "https://irentalsapi.herokuapp.com/login")
    .constant('PROPERTIES_URL', "https://irentalsapi.herokuapp.com/properties")
    .constant('SEND_COMMENTS_TO_ADMIN',"https://irentalsapi.herokuapp.com/send_comments");

})();
