'use strict';

/**
 * @ngdoc function
 * @name cpaApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the cpaApp
 */
angular.module('cpaApp')
    .controller('EventsCtrl', function ($scope, NetworkService, CountryService, EventService) {

        $scope.filters = {};

        $scope.networks = [];

        $scope.countries = [];

        $scope.events = [];

        var preload_data = function () {
            NetworkService.fetchAll()
                .then(function(response){
                    $scope.networks = response.data;
                });

            CountryService.fetchAll()
                .then(function(response){
                    $scope.countries = response.data;
                });

        };

        preload_data();


        var inProgress = false;

        var load_events = function () {

            //console.log('fire', inProgress, $scope.events.length);

            if (!inProgress) {
                inProgress = true;

                EventService.fetch($scope.filters, 0)
                    .then(function (response) {
                        $scope.events = response.data;

                        inProgress = false;
                    });
            }
        };


        $scope.loadNextPage = function () {
            if (!inProgress) {
                inProgress = true;

                var offset = $scope.events.length;
                EventService.fetch($scope.filters, offset)
                    .then(function (response) {
                        $scope.events = $scope.events.concat(response.data);
                        inProgress = false;
                    });
            }
        };

        var clear_results = function () {
            $scope.events = [];
        };

        $scope.$watch(
            'filters',
            function() {
                clear_results();
                load_events();
            },
            true);
    });
