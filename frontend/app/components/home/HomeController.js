(function(){

  angular
       .module('app.home', [])
       .controller('HomeController', [
          'HomeService', '$mdSidenav', '$mdBottomSheet', '$mdToast', '$http', '$q',
          HomeController
       ]);


  /**
   * Home Controller for the app
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function HomeController( HomeService, $mdSidenav, $mdBottomSheet, $mdToast, $http, $q) {
    var self = this;

    self.decrementCount  = decrementCount;
    self.incrementCount  = incrementCount;
    self.dessertChosen   = dessertChosen;
    self.newPleasure     = '';
    self.addPleasure     = addPleasure;

    $http({
      method: 'GET',
      url: 'http://6641235f.ngrok.com/api/pleasures'
    }).then(function successCallback(response) {
        self.desserts = [].concat(response.data.pleasures);
      }, function errorCallback(response) {
        HomeService
          .loadAllItems()
          .then( function( items ) {
            self.desserts = [].concat(items.desserts);
          });
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
        var data = {
          name: newPleasure
        };
        $http.post('http://6641235f.ngrok.com/api/pleasures', data).success(function(response, status) {
          console.log('response', response);
          self.desserts = response.pleasures;
          $mdToast.show(
            $mdToast.simple()
              .content('Pleasure Added!')
              .position('bottom right')
              .hideDelay(3000)
          );
        }).error(function(data) {
          $mdToast.show(
            $mdToast.simple()
              .content('Unable to add pleasure')
              .position('bottom right')
              .hideDelay(3000)
          );
        });

        // var newPleasureObj = {
        //   name: newPleasure,
        //   count: 0,
        //   imgSrc: 'assets/images/desserts/img_cookie.png'
        // }
      }
    }


  }

})();