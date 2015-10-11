(function(){

  angular
       .module('app', ['ngNewRouter'])
       .controller('AppController', [
          'AppService', '$router', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$log', '$q',
          AppController
       ]);


  /**
   * Main Controller for the app
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function AppController( AppService, $router, $mdSidenav, $mdBottomSheet, $mdDialog, $log, $q) {
    $router.config([
      {
        path: '/',
        components: {
          'home': 'home'
        }
      }
    ]);

    var self = this;

    self.selected           = null;
    self.toggleNav          = toggleNav;
    self.openLoginMenu      = openLoginMenu;
    self.login              = login;
    self.share              = share;
    self.input              = getInputObj();
    self.cities             = loadAllCities();
    self.querySearch        = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;


    // Load all registered items
    AppService
      .loadAllItems()
      .then( function( items ) {
        self.mobileLoginMenu = [].concat(items.mobileLogin);
        self.mobileNav = [].concat(items.mobileNav.guest);
        self.months = items.months;
      });


    // *********************************
    // Internal methods
    // *********************************

    /**
     * Get Default Cities
     */
    function getInputObj() {
      return {
        city: '',
        duration: 4,
        start: AppService.nextStartMonth
      };
    }

    /**
     * Search for cities... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.cities.filter( createFilterFor(query) ) : self.cities,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
    }
    function selectedItemChange(item) {
    }
    /**
     * Build `cities` list of key/value pairs
     */
    function loadAllCities() {
      var allCities = 'Toronto, Vancouver, Palo Alto, Mountain View, Redwood City, San Francisco,\
              Mississauga, Waterloo, Kitchener, Burnaby, Seattle, New York, Boston, Austin,\
              Los Angeles, Montreal, Ottawa, Calgary, Hamilton, Markham, Ann Arbor';
      return allCities.split(/, +/g).map( function (city) {
        return {
          value: city.toLowerCase(),
          display: city
        };
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(city) {
        return (city.value.indexOf(lowercaseQuery) === 0);
      };
    }


    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleNav() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Mobile Login Menu
     */
    var originatorEv;
    function openLoginMenu($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    /**
     * Mobile Login or Signup
     */
    function login(event, type) {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Login clicked!')
          .content('Enter your email and password')
          .ok('Login')
      );
      originatorEv = null;
    };

    /**
     * Show the bottom sheet
     */
    function share($event) {
        var list = self.selected;

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: 'home/view/shareSheet.html',
          controller: [ '$mdBottomSheet', TodoSheetController ],
          controllerAs: "vm",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function TodoSheetController( $mdBottomSheet ) {
          this.list = list;
          this.items = [
            // { name: 'Facebook'    , icon: 'facebook'    , icon_url: 'assets/svg/facebook.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
