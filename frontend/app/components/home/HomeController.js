(function(){

  angular
       .module('app.home', ['ngNewRouter'])
       .controller('HomeController', [
          'HomeService', '$router', '$mdSidenav', '$mdBottomSheet', '$mdDialog', '$log', '$q',
          HomeController
       ]);

      //  HomeController.$routeConfig = [
      //    { path: '/',      components: { 'main': 'home' } }
      //  ];

  /**
   * Home Controller for the app
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function HomeController( HomeService, $router, $mdSidenav, $mdBottomSheet, $mdDialog, $log, $q) {
    var self = this;

    HomeService
      .loadAllItems()
      .then( function( items ) {
        self.desserts = [].concat(items.desserts);
      });

  }

})();
