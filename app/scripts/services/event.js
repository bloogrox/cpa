'use strict';


/**
 * @ngdoc service
 * @name cpaApp.Event
 * @description
 * # Event
 * Service in the cpaApp.
 */
angular.module('cpaApp')
    .service('EventService', function ($q, ENV, $http) {
        return {
            fetch: function (params, offset) {
                return $http.get(ENV.apiUrl + '/api/events/', {params: angular.extend({}, params, {offset: offset})});
            },
            fetchNewOffersCount: function () {
                return $http.get(ENV.apiUrl + '/api/events/new_offers_count/');
            }
        }
    });
