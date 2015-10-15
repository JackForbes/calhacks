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
          id: 1,
          name: "Beer",
          count: 0,
          url: "/static/assets/images/desserts/img_beer.png"
        }, {
          id: 2,
          name: "Donut",
          count: 0,
          url: "/static/assets/images/desserts/img_donut.png"
        }, {
          id: 3,
          name: "Chocolate",
          count: 0,
          url: "/static/assets/images/desserts/img_chocolate.png"
        }, {
          id: 4,
          name: "Ice Cream",
          count: 0,
          url: "/static/assets/images/desserts/img_icecream.png"
        }, {
          id: 5,
          name: "Cookies",
          count: 0,
          url: "/static/assets/images/desserts/img_cookie.png"
        }, {
          id: 6,
          name: "Cupcake",
          count: 0,
          url: "/static/assets/images/desserts/img_cupcake.png"
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
