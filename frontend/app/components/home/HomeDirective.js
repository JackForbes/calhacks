(function() {
  'use strict';

  angular.module('app.home')
    .directive('resize', ['$window', Resize]);

  /**
   * Watches window resize and returns width and height
   *
   * @returns {{width: int, height: int}}
   * @constructor
   */
  function Resize($window) {
    return function(scope, element, attr) {
      var forecastDenominator = 2;
      var deviceDenominator = 1.5;
      if (window.innerWidth < 600) {
        scope.forecastChartWidth = window.innerWidth;
        scope.deviceChartWidth = window.innerWidth;
      } else {
        scope.forecastChartWidth = window.innerWidth / forecastDenominator;
        scope.deviceChartWidth = window.innerWidth / deviceDenominator;
      }

      var w = angular.element($window);
      scope.$watch(function() {
        return {
          'w': window.innerWidth
        };
      }, function(newValue, oldValue) {
        if (newValue.w < 600) {
          scope.forecastChartWidth = newValue.w;
          scope.deviceChartWidth = newValue.w;
        } else {
          scope.forecastChartWidth = newValue.w / 2;
          scope.deviceChartWidth = newValue.w / 1.5;
        }
      }, true);

      w.bind('resize', function() {
        scope.$apply();
      });
    }
  }

})();
