(function(){

  angular
       .module('app', [])
       .controller('AppController', [
          'AppService', 'constants', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$location', '$q', '$http', '$sce',
          AppController
       ]);


  /**
   * Main Controller for the app
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function AppController( AppService, constants, $mdSidenav, $mdBottomSheet, $mdDialog, $location, $q, $http, $sce) {
    var self = this;

    self.loading            = false;
    self.selected           = null;
    self.toggleNav          = toggleNav;
    self.navClick           = navClick;
    self.share              = share;
    self.showAddPleasure    = false;
    self.toggleAddPleasure  = toggleAddPleasure;
    self.chosenPleasures    = [];
    self.activities         = {};
    self.submitPleasures    = submitPleasures;
    self.activityType       = '';
    self.mapHtml            = '';
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
    function goToMap(type) {
      self.loading = true;
      $http({
        method: 'GET',
        params: {'activity_type': type},
        url: constants.apiBaseUrl + 'api/nearest_embedded_route'
      }).then(function successCallback(response) {
          $location.path('map');
          self.mapHtml = $sce.trustAsHtml(response.data.template);
          self.loading = false;
        }, function errorCallback(response) {
          self.loading = false;
        });

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
      self.loading = true;
      self.chosenPleasures = [];
      var data = {
        weight: 160,
        stuff: []
      };
      desserts.forEach(function(obj) {
        if (obj.count > 0) {
          data.stuff.push(obj);
          self.chosenPleasures.push(obj);
        }
      });

      $http({
        method: 'GET',
        url: constants.apiBaseUrl + 'api/burn',
        params: data
      }).then(function successCallback(response) {
          self.activities = response.data.activities.activities;
          self.loading = false;
        }, function errorCallback(response) {
          self.loading = false;
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
          { name: 'Twitter'     , icon: 'twitter'     , icon_url: '/static/assets/svg/twitter.svg'},
          { name: 'Google+'     , icon: 'google_plus' , icon_url: '/static/assets/svg/google_plus.svg'},
          { name: 'Hangout'     , icon: 'hangouts'    , icon_url: '/static/assets/svg/hangouts.svg'}
        ];
        this.performAction = function(action) {
          $mdBottomSheet.hide(action);
        };
      }
    }

  }

})();
