(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name iRentalsFrontApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the iRentalsFrontApp
   */
  angular.module('iRentalsApp')
    .controller('MainCtrl', mainCtrl);

  mainCtrl.$inject = ["$log"];
  function mainCtrl($log) {
    var mainScope = this;


    mainScope.carouselData = [
      {src: "http://www.sideshowtoy.com/wp-content/uploads/2016/09/star-wars-rogue1-death-trooper-specialist-02.jpg"},
      {src: "https://coedmagazine.files.wordpress.com/2014/11/star-wars-force-awakens-gifs-6.gif?w=750"},
      {src: "http://bestanimations.com/Sci-Fi/StarWars/star-wars-animated-gif-30.gif"},
      {src: "http://www.radiotimes.com/uploads/images/Original/102092.gif"},
      {src: "https://metrouk2.files.wordpress.com/2016/10/star-wars-rogue-one-gif.gif?w=620&h=348&crop=1"}
    ];
  }
})();

