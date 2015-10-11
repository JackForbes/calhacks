(function() {
  'use strict';

  angular.module('app.home')
    .service('HomeService', ['$q', HomeService]);

  /**
   * Lists DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function HomeService($q) {
    var items = {
      desserts: [{
          name: "Beer",
          imgSrc: "assets/images/desserts/img_beer.png",
        }, {
          name: "Donut",
          imgSrc: "assets/images/desserts/img_donut.png",
        }, {
          name: "Chocolate",
          imgSrc: "assets/images/desserts/img_chocolate.png",
        }, {
          name: "Ice Cream",
          imgSrc: "assets/images/desserts/img_icecream.png",
        }, {
          name: "Cookies",
          imgSrc: "assets/images/desserts/img_cookie.png",
        }, {
          name: "Cupcake",
          imgSrc: "assets/images/desserts/img_cupcake.png",
      }]
    };

    // Promise-based API
    return {
      loadAllItems: function() {
        // Simulate async nature of real remote calls
        return $q.when(items);
      }
    };
  }

})();
