(function(){

  angular
       .module('app.post', [])
       .controller('PostController', [
          'PostService',
          PostController
       ]);


  /**
   * Post Controller for the app
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function PostController( PostService) {
    var self = this;

    // Load all registered items
    PostService
      .loadAllItems()
      .then( function( items ) {
        self.mockPost = items.mockPost;
      });


    // *********************************
    // Internal methods
    // *********************************



  }

})();
