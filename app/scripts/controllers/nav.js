'use strict';

/**
 * @ngdoc function
 * @name cpaApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the cpaApp
 */
angular.module('cpaApp')
    .controller('NavCtrl', function ($scope, EventService, $interval) {

        $scope.new_offers_count = 0;


        var load_data = function () {
            EventService.fetchNewOffersCount()
                .then(function (response) {
                    $scope.new_offers_count = response.data;
                });
        };

        load_data();

        $interval(load_data, 1000 /*1 sec*/ * 60 /*1 min*/ * 15);
    });
