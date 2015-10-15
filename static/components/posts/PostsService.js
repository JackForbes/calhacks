(function() {
  'use strict';

  angular.module('app.posts')
    .service('PostsService', ['$q', PostsService]);

  /**
   * Lists DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function PostsService($q) {
    var items = {
      mockPosts: [
        {
          id: 1,
          title: 'Beautiful One Bedroom in Yaletown',
          name: 'Alyssa',
          imgSrc: "/static/assets/images/mocks/bedroom.jpg",
          profileImgSrc: "/static/assets/images/mocks/headshot4.png",
          price: 750,
          rating: 4.5,
          reviews: 4,
          size: 'Entire home',
          verified: true,
          bookmarked: true,
          tenants: [
            { name: 'Tom', id: '100' },
            { name: 'Frank', id: '101' }
          ]
        },
        {
          id: 2,
          title: 'Two Bedroom Gastown - Plenty of Space!',
          name: 'Thomas',
          imgSrc: "/static/assets/images/mocks/living-room.jpg",
          profileImgSrc: "/static/assets/images/mocks/headshot2.png",
          price: 735,
          rating: 4.5,
          reviews: 2,
          size: 'Apartment',
          verified: false,
          tenants: [
            { name: 'Susan', id: '102' },
            { name: 'Meredith', id: '103' },
            { name: 'Becky', id: '104' }
          ]
        },
        {
          id: 3,
          title: 'Yaletown 1BD Clean and Comfortable',
          name: 'Miranda',
          imgSrc: "/static/assets/images/mocks/family-room.jpg",
          profileImgSrc: "/static/assets/images/mocks/headshot3.png",
          price: 720,
          rating: 4.3,
          reviews: 3,
          size: 'Entire home',
          verified: true,
          tenants: [
            { name: 'John', id: '105' },
            { name: 'Sam', id: '106' },
            { name: 'Alice', id: '107' },
            { name: 'Eliza', id: '108' }
          ]
        }
      ]
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
