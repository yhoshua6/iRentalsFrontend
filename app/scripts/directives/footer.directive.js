/**
 * Created by jose- on 09/01/2017.
 */
(function() {
  'use strict';

  angular.module("iRentalsApp")
    .directive("pageFooter", headerDirective);

  function headerDirective() {
    return {
      restrict: 'E',
      templateUrl: '../../views/directives/page_footer.html'//,
      //controller: '',
      //controllerAs: ''
    }
  }
})();
