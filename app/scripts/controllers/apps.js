'use strict';

/**
 * @ngdoc function
 * @name cpaApp.controller:AppsCtrl
 * @description
 * # AppsCtrl
 * Controller of the cpaApp
 */
angular.module('cpaApp')
    .controller('AppsCtrl', function ($scope, AppService, CountryService, $filter) {

        $scope.filters = {};

        $scope.reset_filters = function () {
            $scope.filters = {};
        };

        $scope.apps = [];

        $scope.countries = [];


        var load_apps = function () {
            AppService.fetch($scope.filters, 0)
                .then(function (response) {
                    $scope.apps = response.data;
                });
        };


        var preload_data = function () {
            CountryService.fetchAll()
                .then(function(response){
                    $scope.countries = response.data;
                });
        };

        /***
         * Load data
         */
        preload_data();


        $scope.get_max_payout = function (offers) {
            if (offers.length) {
                var ordered = $filter('orderBy')(offers, 'payout', true);
                return ordered[0].payout;
            }
            else {
                return 0;
            }
        };


        $scope.get_countries = function (offers) {

            if (offers) {

                var countries = offers
                    // выдернем страны из оффера
                    .map(function (offer) {
                        return offer.countries;
                    })
                    // разложим в массив
                    .reduce(function(prev, current){
                        return prev.concat(current);
                    })
                    // выдернем коды стран из стран
                    .map(function(country){
                        return country.code;
                    })
                    // выберем только уникальные коды стран
                    .reduce(function(p, c){
                        if (p.indexOf(c) < 0) {
                            p.push(c)
                        }
                        return p;
                    }, [])
                    ;
                return countries;
            }
            else {
                return null;
            }
        };


        var inProgress = false;

        $scope.loadNextPage = function () {
            if (!inProgress) {
                inProgress = true;

                var offset = $scope.apps.length;
                AppService.fetch($scope.filters, offset)
                    .then(function (response) {
                        $scope.apps = $scope.apps.concat(response.data);
                        inProgress = false;
                    });
            }
        };


        var clear_results = function () {
            $scope.apps = [];
        };

        /***
         * Watch filters and reload data
         */
        $scope.$watch(
            'filters',
            function() {
                clear_results();
                load_apps();
            },
            true);

    });
