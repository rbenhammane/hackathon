'use strict';

define([], function () {

    var factory = angular.module('app.common.factory', []);
    
    factory.factory('supplier', [ '$http', function($http) {
        return {
            list: function (limit, callback) {
                $http({
                    method: 'GET',
                    url: 'supplier?limit=' + limit
                }).success(callback);
            },
            file: function(file, callback) {
                $http({
                    method: 'GET',
                    url: 'files/' + file
            }).success(callback);
        }
        };
    }]);

    return factory;
});
