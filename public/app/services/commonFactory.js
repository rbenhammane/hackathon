'use strict';

define([], function () {

    var factory = angular.module('app.common.factory', []);
    
    factory.factory('commonFactory', [ '$http', function($http) {
        return {
            suppliers: function (limit, callback) {
                $http({
                    method: 'GET',
                    url: 'api/supplier?limit=' + limit
                }).success(callback);
            },
            donators: function (callback) {
                $http({
                    method: 'GET',
                    url: 'api/donator'
                }).success(callback);
            },
        };
    }]);

    return factory;
});
