(function() {
  'use strict';
  angular.module("app", ['ui.router', 'angularMoment']).config(config);


  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function config($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    $stateProvider
      .state({
        name: 'main',
        url: '/',
        component: 'newPost',
      })
      .state({
        name: 'edit',
        url: '/posts/:id/edit',
        component: 'edit'
      });
  }
}());
