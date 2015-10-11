(function() {
  'use strict';

  angular.module('app.post')
    .service('PostService', ['$q', PostService]);

  /**
   * Lists DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function PostService($q) {
    var items = {
      mockPost: {
        id: 1,
        title: 'Beautiful One Bedroom in Yaletown',
        name: 'Alyssa',
        imgSrc: "assets/images/mocks/bedroom.jpg",
        profileImgSrc: "assets/images/mocks/headshot4.png",
        price: 750,
        rating: 4.5,
        reviews: 4,
        size: 'Entire home',
        verified: true,
        bookmarked: true,
        beds: 4,
        bedrooms: 2,
        wifi: true,
        cars: 1,
        tenants: [
          { name: 'Tom', id: '100' },
          { name: 'Frank', id: '101' }
        ]
      }
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
