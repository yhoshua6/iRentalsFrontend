(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("reportsCtrl", reportsCtrl);

  reportsCtrl.$inject = [];
  function reportsCtrl() {
    var reportsScope = this;
    reportsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    reportsScope.reports = [
      { id: 0, title: "hey", fileName: "upload.pdf", fileDate: "20-10-2017"},
      { id: 1, title: "hey 4", fileName: "upload2.pdf", fileDate: "20-10-2017"},
      { id: 2, title: "hey 3", fileName: "upload3.pdf", fileDate: "20-10-2017"},
      { id: 3, title: "hey 2", fileName: "upload4.pdf", fileDate: "20-10-2017"}
    ];
    reportsScope.selected = [];
  }
})();
