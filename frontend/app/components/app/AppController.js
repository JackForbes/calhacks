(function(){

  angular
       .module('app', [])
       .controller('AppController', [
          'AppService', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$location', '$q', '$http',
          AppController
       ]);


  /**
   * Main Controller for the app
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function AppController( AppService, $mdSidenav, $mdBottomSheet, $mdDialog, $location, $q, $http) {
    var self = this;
    var baseUrl = "http://74ddfc52.ngrok.com/";

    self.selected           = null;
    self.toggleNav          = toggleNav;
    self.navClick           = navClick;
    self.share              = share;
    self.showAddPleasure    = false;
    self.toggleAddPleasure  = toggleAddPleasure;
    self.chosenPleasures    = [];
    self.activities         = {};
    self.submitPleasures    = submitPleasures;
    self.goToMap            = goToMap;


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
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleNav() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function() {
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Change location
     */
    function navClick(href) {
      self.toggleNav();
      $location.path(href);
    }

    /**
     * Change location
     */
    function goToMap() {
      $location.path('map');
    }

    /**
     * Hide or Show the 'add pleasure' section
     */
    function toggleAddPleasure() {
      self.showAddPleasure = !self.showAddPleasure;
    }

    /**
     * Submit Pleasures
     */
    function submitPleasures(desserts) {
      var data = {
        weight: 160,
        stuff: []
      };
      desserts.forEach(function(obj) {
        if (obj.count > 0) {
          data.stuff.push(obj);
          self.chosenPleasures.push(obj);
          console.log('chosen pleasures', self.chosenPleasures);
        }
      });

      $http({
        method: 'GET',
        url: baseUrl + 'api/burn',
        params: data
      }).then(function successCallback(response) {
        console.log('burn response', response);
        self.activities = response.data.activities.activities;
        }, function errorCallback(response) {
        });

      $location.path('penance');
    }

    /**
     * Show the bottom sheet
     */
    function share($event) {
        var list = self.selected;

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: 'components/home/view/shareSheet.html',
          controller: [ '$mdBottomSheet', TodoSheetController ],
          controllerAs: "vm",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          //Do something
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
