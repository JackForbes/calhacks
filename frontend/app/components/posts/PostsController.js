(function(){

  angular
       .module('app.posts', ['ngNewRouter'])
       .controller('PostsController', [
          'PostsService', '$mdDialog',
          PostsController
       ]);

  /**
   * Posts Controller for the app
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function PostsController( PostsService, $mdDialog) {
    var self = this;

    self.showFilters = false;
    self.toggleFilters = toggleFilters;


    // Load all registered items
    PostsService
      .loadAllItems()
      .then( function( items ) {
        self.mockPosts = [].concat(items.mockPosts);
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
