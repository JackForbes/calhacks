'use strict';

// Declare app level module which depends on controllers, directives, filters, and services
angular.module('myApp', [
    'ngNewRouter',
    'ngMaterial',
    'app',
    'app.home',
    'app.posts',
    'app.post'
  ])
  .config(function($mdThemingProvider, $mdIconProvider) {
    // $routeProvider.when('/search', {
    //   templateUrl: 'search/view/search.html',
    //   controller: 'SearchCtrl'
    // });

    $mdThemingProvider.theme('default')
      .primaryPalette('green', {
        'default': '500',
        'hue-1': '100',
        'hue-2': '600',
        'hue-3': 'A100'
      })
      .accentPalette('grey', {
        'default': '900'
      });

    $mdIconProvider
      .iconSet('action', 'assets/svg/action-icons.svg', 24)
      .iconSet('content', 'assets/svg/content-icons.svg', 24)
      .iconSet('communication', 'assets/svg/communication-icons.svg', 24)
      .iconSet('editor', 'assets/svg/editor-icons.svg', 24)
      .iconSet('hardware', 'assets/svg/hardware-icons.svg', 24)
      .iconSet('image', 'assets/svg/image-icons.svg', 24)
      .iconSet('maps', 'assets/svg/maps-icons.svg', 24)
      .iconSet('navigation', 'assets/svg/navigation-icons.svg', 24)
      .iconSet('social', 'assets/svg/social-icons.svg', 24);

  });
