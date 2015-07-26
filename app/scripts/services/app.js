'use strict';

/**
 * @ngdoc service
 * @name cpaApp.app
 * @description
 * # app
 * Service in the cpaApp.
 */
angular.module('cpaApp')
    .service('AppService', function ($http, ENV) {
        return {
            fetchById: function(id){
                return $http.get(ENV.apiUrl + '/api/apps/' + id + '/');
            },
            fetch: function(params, offset){
                return $http.get(ENV.apiUrl + '/api/apps/', {params: angular.extend({}, params, {offset: offset})});
            }
        };
    });
