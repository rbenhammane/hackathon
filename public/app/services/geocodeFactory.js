'use strict';

define([], function () {

    var factory = angular.module('app.geocode', []);
    
    factory.factory('geocode', [ '$http', function($http) {
        return {
            getLatLng: function (address, callback) {
                $http({
                    method: 'GET',
                    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(address) + '&key=' + config.googleKey
                }).success(callback);
            }
        };
    }]);

    return factory;
});
