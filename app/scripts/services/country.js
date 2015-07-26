'use strict';

/**
 * @ngdoc service
 * @name cpaApp.country
 * @description
 * # country
 * Service in the cpaApp.
 */
angular.module('cpaApp')
    .service('CountryService', function ($q, $http, ENV) {
        return {
            fetchAll: function () {
                return $http.get(ENV.apiUrl + '/api/countries/');
            }
        }
    });
