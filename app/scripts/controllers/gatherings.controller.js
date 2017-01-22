/**
 * Created by jose- on 22/01/2017.
 */
(function () {
  'use strict';
  angular.module('iRentalsApp')
    .controller('gatheringsCtrl', gatheringsCtrl);


  gatheringsCtrl.$inject = ['$mdDialog', 'requestService', "$mdBottomSheet"];
  function gatheringsCtrl($mdDialog, requestService, $mdBottomSheet) {
    var gatheringsCtrl = this;
    gatheringsCtrl.docs = [
      { fileName: 'SomeFile.pdf', img: '../../images/pdf-icon.ico', uploaded: "21/01/2017" },
      { fileName: 'someOtherFile.pdf', img: '../../images/pdf-icon.ico', uploaded: "21/01/2017" },
      { fileName: 'duude.pdf', img: '../../images/pdf-icon.ico', uploaded: "21/01/2017" }
    ];


    gatheringsCtrl.people = [
      { name: 'Some one', img: '../../images/pdf-icon.ico'},
      { name: 'Some other one', img: '../../images/pdf-icon.ico'},
      { name: 'And this other one', img: '../../images/pdf-icon.ico'}
    ];
  }
})();
