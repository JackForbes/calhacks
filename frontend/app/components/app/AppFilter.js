(function() {
  'use strict';

  angular.module('app')
    .filter('floor', [floor]);

  /**
   * Floors a passed in number and returns an array
   */
  function floor() {
    return function(num) {
      var array = [];
      for (var i = 0; i < Math.floor(num); ++i) {
        array.push(i);
      }

      return array;
    };
  }

})();
