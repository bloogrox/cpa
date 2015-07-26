'use strict';

/**
 * @ngdoc function
 * @name cpaApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the cpaApp
 */
angular.module('cpaApp')
    .controller('AppCtrl', function ($scope, $stateParams, OfferService, AppService) {

        var offers = [];

        $scope.offers = offers;

        $scope.app = {};

        var load_data = function () {
            //load app
            AppService.fetchById($stateParams.id)
                .then(function (response) {
                    $scope.app = response.data;
                });
            //load offers
            OfferService.fetch({app_id: $stateParams.id})
                .then(function (response) {
                    $scope.offers = response.data;
                })
        };

        load_data();

    });
