/**
 * Created by jose- on 20/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .controller('docsCtrl', docsCtrl);


  docsCtrl.$inject = ['$mdDialog', 'requestService', "$mdBottomSheet"];
  function docsCtrl($mdDialog, requestService, $mdBottomSheet) {
    var docsScope = this;
    docsScope.docs = [
      { fileName: 'SomeFile.pdf', img: '../../images/pdf-icon.ico', uploaded: "21/01/2017" },
      { fileName: 'someOtherFile.pdf', img: '../../images/pdf-icon.ico', uploaded: "21/01/2017" },
      { fileName: 'duude.pdf', img: '../../images/pdf-icon.ico', uploaded: "21/01/2017" }
    ];

  }
})();
