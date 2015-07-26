'use strict';


/**
 * @ngdoc service
 * @name cpaApp.Network
 * @description
 * # Network
 * Service in the cpaApp.
 */
angular.module('cpaApp')
    .service('NetworkService', function ($q, $http, ENV) {
        return {
            fetchAll: function () {
                return $http.get(ENV.apiUrl + '/api/networks/');
            }
        }
    });
