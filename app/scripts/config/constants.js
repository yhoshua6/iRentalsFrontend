/**
 * Created by jose- on 16/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .constant('LOGIN_URL', "http://localhost:3000/login")
    .constant('PROPERTIES_URL', "http://localhost:3000/properties")
    .constant('SEND_COMMENTS_TO_ADMIN',"http://localhost:3000/send_comments");

})();
