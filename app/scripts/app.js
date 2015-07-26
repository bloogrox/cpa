'use strict';

/**
 * @ngdoc overview
 * @name cpaApp
 * @description
 * # cpaApp
 *
 * Main module of the application.
 */
angular
    .module('cpaApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ui.select',
        'infinite-scroll',
        'angular-loading-bar',
        'constant',
        'angularMoment',
        'ng.group',
        'ui.router'
    ])
    .config(function ($routeProvider, $stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('offers', {
                url: '/offers',
                templateUrl: 'views/offers.html',
                controller: 'OffersCtrl'
            })
            .state('events', {
                url: '/events',
                templateUrl: 'views/events.html',
                controller: 'EventsCtrl'
            })
            .state('app', {
                url: '/app/{id:int}',
                templateUrl: 'views/app.html',
                controller: 'AppCtrl'
            })
            .state('apps', {
                url: '/apps',
                templateUrl: 'views/apps.html',
                controller: 'AppsCtrl'
            })
        ;


        $urlRouterProvider.otherwise('/apps');

    })
    .run(function(amMoment){
        amMoment.changeLocale('ru');
    });
