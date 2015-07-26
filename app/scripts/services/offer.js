'use strict';


/**
 * @ngdoc service
 * @name cpaApp.Offer
 * @description
 * # Offer
 * Service in the cpaApp.
 */
angular.module('cpaApp')
    .service('OfferService', function ($q, ENV, $http) {
        return {
            fetch: function (params, offset) {
                return $http.get(ENV.apiUrl + '/api/offers/', {params: angular.extend({}, params, {offset: offset})});
            }
        }
    });
