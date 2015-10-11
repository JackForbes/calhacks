(function(){

  angular
       .module('app.post', [])
       .controller('PostController', [
          'PostService', '$mdDialog',
          PostController
       ]);


  /**
   * Post Controller for the app
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function PostController( PostService, $mdDialog) {
    var self = this;

    self.showFilters = false;
    self.toggleFilters = toggleFilters;


    // Load all registered items
    PostService
      .loadAllItems()
      .then( function( items ) {
        self.mockPost = items.mockPost;
      });


    // *********************************
    // Internal methods
    // *********************************

    /**
     * Toggle Filters
     */
    function toggleFilters() {
      self.showFilters = !self.showFilters;
    }

  }

})();
