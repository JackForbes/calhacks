'use strict';

// Declare app level module which depends on controllers, directives, filters, and services
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'app',
    'app.home',
    'app.posts',
    'app.post'
  ])
  .constant("constants", {
        "apiBaseUrl": "http://127.0.0.1:5000/"
    })
  .config(function($routeProvider, $httpProvider, $mdThemingProvider, $mdIconProvider) {
    $routeProvider.when('/', {
      templateUrl: '/static/components/home/home.html'
    });
    $routeProvider.when('/penance', {
      templateUrl: '/static/components/post/post.html'
    });
    $routeProvider.when('/scorecard', {
      templateUrl: '/static/components/posts/posts.html'
    });
    $routeProvider.when('/map', {
      templateUrl: '/static/components/post/map.html'
    });
    $routeProvider.otherwise({
      redirectTo: '#/',
      templateUrl: '/static/components/home/home.html',
      controller: 'AppController'
    });

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
      .iconSet('action', '/static/assets/svg/action-icons.svg', 24)
      .iconSet('content', '/static/assets/svg/content-icons.svg', 24)
      .iconSet('communication', '/static/assets/svg/communication-icons.svg', 24)
      .iconSet('editor', '/static/assets/svg/editor-icons.svg', 24)
      .iconSet('hardware', '/static/assets/svg/hardware-icons.svg', 24)
      .iconSet('image', '/static/assets/svg/image-icons.svg', 24)
      .iconSet('maps', '/static/assets/svg/maps-icons.svg', 24)
      .iconSet('navigation', '/static/assets/svg/navigation-icons.svg', 24)
      .iconSet('social', '/static/assets/svg/social-icons.svg', 24);

  });
