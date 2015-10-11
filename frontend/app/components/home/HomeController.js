(function(){

  angular
       .module('app.home', [])
       .controller('HomeController', [
          'HomeService', '$mdSidenav', '$mdBottomSheet', '$mdToast', '$log', '$q',
          HomeController
       ]);


  /**
   * Home Controller for the app
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function HomeController( HomeService, $mdSidenav, $mdBottomSheet, $mdToast, $log, $q) {
    var self = this;

    self.decrementCount  = decrementCount;
    self.incrementCount  = incrementCount;
    self.dessertChosen   = dessertChosen;
    self.newPleasure     = '';
    self.addPleasure     = addPleasure;


    HomeService
      .loadAllItems()
      .then( function( items ) {
        self.desserts = [].concat(items.desserts);
      });

    /**
     * Decrement Count
     */
    function decrementCount(dessert) {
      if (dessert.count != 0) {
        dessert.count = dessert.count - 1;
      }
    }

    /**
     * Increment Count
     */
    function incrementCount(dessert) {
      if (dessert.count < 9) {
        dessert.count = dessert.count + 1;
      }
    }

    /**
     * Determine if dessert has been chosen
     */
    function dessertChosen(desserts) {
      var chosen = false;
      desserts.forEach(function(obj) {
        if (obj.count > 0) {
          chosen = true;
        }
      });

      return chosen;
    }

    /**
     * Add Pleasure
     */
    function addPleasure(newPleasure) {
      if (newPleasure) {
        var newPleasureObj = {
          name: newPleasure,
          count: 0,
          imgSrc: 'assets/images/desserts/img_cookie.png'
        }
        self.desserts.push(newPleasureObj);
        $mdToast.show(
          $mdToast.simple()
            .content('Pleasure Added!')
            .position('bottom right')
            .hideDelay(3000)
        );
      }
    }


  }

})();
