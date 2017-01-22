/**
 * Created by jose- on 22/01/2017.
 */
/**
 * Created by jose- on 20/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .controller('bottomMenuCtrl', bottomMenuCtrl);


  bottomMenuCtrl.$inject = ["$scope", "$mdBottomSheet"];
  function bottomMenuCtrl($mdBottomSheet, $scope) {
    var docsScope = this;
    $scope.items = [
      { name: 'Share', icon: 'share-arrow' },
      { name: 'Upload', icon: 'upload' },
      { name: 'Copy', icon: 'copy' },
      { name: 'Print this page', icon: 'print' }
    ];

    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
  }
})();
