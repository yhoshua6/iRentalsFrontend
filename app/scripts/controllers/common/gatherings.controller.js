(function() {

  "use strict";

  angular.module("iRentalsApp")
    .controller("gatheringsCtrl", gatheringsCtrl);

  gatheringsCtrl.$inject = [];
  function gatheringsCtrl() {
    var gatheringsScope = this;
    gatheringsScope.query = {
      order: 'title',
      limit: 5,
      page: 1
    };
    gatheringsScope.documents = [
      { id: 0, fileName: "upload.pdf", fileDate: "20-10-2017"},
      { id: 1, fileName: "upload1.pdf", fileDate: "22-10-2017"},
      { id: 2, fileName: "upload2.pdf", fileDate: "24-10-2017"},
      { id: 3, fileName: "upload3.pdf", fileDate: "27-10-2017"}
    ];
    gatheringsScope.selected = [];

    gatheringsScope.users = [
      { id: 0, userName: "someOne"},
      { id: 1, userName: "someOne 1"},
      { id: 2, userName: "someOne 2"},
      { id: 3, userName: "someOne 3"},
    ];
  }
})();
