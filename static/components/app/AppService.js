(function() {
  'use strict';

  angular.module('app')
    .service('AppService', ['$q', AppService]);

  /**
   * Lists DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function AppService($q) {
    var items = {
      mobileLogin: [{
        title: 'Sign In',
        svg: 'social:person',
        type: 'signIn'
      }, {
        title: 'Sign Up',
        svg: 'social:person_add',
        type: 'signUp'
      }],
      mobileNav: {
        guest: [{
          title: 'Pleasures',
          svg: 'image:tag_faces',
          href: ''
        }, {
          title: 'Scorecard',
          svg: 'image:grid_on',
          href: 'scorecard'
        }, {
          title: 'Logout',
          svg: 'action:exit_to_app',
          href: ''
        }],
        student: [{
          title: 'Home',
          svg: 'action:dashboard'
        }, {
          title: 'Roommates',
          svg: 'social:people'
        }, {
          title: 'Peer Finder',
          svg: 'action:explore'
        }, {
          title: 'Profile',
          svg: 'action:account_circle'
        }, {
          title: 'Work History',
          svg: 'action:work'
        }, {
          title: 'Messages',
          svg: 'communication:message'
        }, {
          title: 'Account',
          svg: 'action:settings'
        }],
        landlord: [{
          title: 'Home',
          svg: 'action:dashboard'
        }, {
          title: 'Profile',
          svg: 'action:account_circle'
        }, {
          title: 'Messages',
          svg: 'communication:message'
        }, {
          title: 'Account',
          svg: 'action:settings'
        }, {
          title: 'List Your Space',
          svg: 'action:home'
        }]
      },
      months: [ 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug' ]
    };

    // Promise-based API
    return {
      loadAllItems: function() {
        // Simulate async nature of real remote calls
        return $q.when(items);
      },
      nextStartMonth: nextStartMonth()
    };
  }

  /**
   * Get the start month of the next work term
   */
  function nextStartMonth() {
    var thisMonth = new Date().getMonth();
    var nextMonth = 'Jan';

    if (0 <= thisMonth && thisMonth < 4) {
      nextMonth = 'May';
    } else if (4 <= thisMonth && thisMonth < 8) {
      nextMonth = 'Sep';
    }

    return nextMonth;
  }

})();
