(function(){

  angular
       .module('app.post', [])
       .controller('PostController', [
          'PostService', '$mdDialog', '$http', '$sce',
          PostController
       ]);


  /**
   * Post Controller for the app
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function PostController( PostService, $mdDialog, $http, $sce) {
    var self = this;
    var baseUrl = "http://5c89e864.ngrok.com/";

    self.showFilters   = false;
    self.toggleFilters = toggleFilters;
    self.mapHtml       = '';


    $http({
      method: 'GET',
      url: baseUrl + 'api/nearest_embedded_route'
    }).then(function successCallback(response) {
        console.log('response', response);
        self.mapHtml = $sce.trustAsHtml(response.data.template);
      }, function errorCallback(response) {
      });


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
