(function(){

  angular
       .module('app', [])
       .controller('AppController', [
          'AppService', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$location', '$q',
          AppController
       ]);


  /**
   * Main Controller for the app
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function AppController( AppService, $mdSidenav, $mdBottomSheet, $mdDialog, $location, $q) {
    var self = this;

    self.selected           = null;
    self.toggleNav          = toggleNav;
    self.share              = share;
    self.showAddPleasure    = false;
    self.toggleAddPleasure  = toggleAddPleasure;
    self.chosenPleasures    = [];
    self.submitPleasures = submitPleasures;


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
     * Hide or Show the 'add pleasure' section
     */
    function toggleAddPleasure() {
      self.showAddPleasure = !self.showAddPleasure;
    }

    /**
     * Submit Pleasures
     */
    function submitPleasures(desserts) {
      desserts.forEach(function(obj) {
        if (obj.count > 0) {
          self.chosenPleasures.push(obj);
        }
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
          templateUrl: 'home/view/shareSheet.html',
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
