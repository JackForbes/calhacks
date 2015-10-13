(function(){

  angular
       .module('app.post', [])
       .controller('PostController', [
          'PostService', 'constants', '$mdDialog', '$http', '$sce',
          PostController
       ]);


  /**
   * Post Controller for the app
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function PostController( PostService, constants, $mdDialog, $http, $sce) {
    var self = this;

    self.showFilters   = false;
    self.toggleFilters = toggleFilters;
    self.mapHtml       = '';


    $http({
      method: 'GET',
      url: constants.apiBaseUrl + 'api/nearest_embedded_route'
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
