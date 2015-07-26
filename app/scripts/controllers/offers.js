'use strict';


/**
 * @ngdoc function
 * @name cpaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cpaApp
 */
angular.module('cpaApp')
    .controller('OffersCtrl', function ($scope, NetworkService, CountryService, OfferService, $location) {

        $scope.filter_defaults = {
            ordering: 'new'
        };

        $scope.filters = angular.copy($scope.filter_defaults);

        $scope.reset_filters = function () {
            $scope.filters = angular.copy($scope.filter_defaults);
        };

        $scope.offers = [];

        $scope.networks = [];

        $scope.countries = [];

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

        /***
         * Load data
         */
        preload_data();

        var load_offers = function () {
            OfferService.fetch($scope.filters, 0)
                .then(function (response) {
                $scope.offers = response.data;
            });
        };

        var inProgress = false;

        $scope.loadNextPage = function () {
            if (!inProgress) {
                inProgress = true;

                var offset = $scope.offers.length;
                OfferService.fetch($scope.filters, offset)
                    .then(function (response) {
                        $scope.offers = $scope.offers.concat(response.data);
                        inProgress = false;
                    });
            }
        };

        var clear_results = function () {
            $scope.offers = [];
        };

        /***
         * Watch filters and reload data
         */
        $scope.$watch(
            'filters',
            function() {
                clear_results();
                load_offers();
            },
            true);

    });
