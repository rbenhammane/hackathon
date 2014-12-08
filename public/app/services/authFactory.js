'use strict';

define([], function () {

    var factory = angular.module('app.auth', []);
    
    factory.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('authInterceptor');
            }
        ]);
    }])
    
    .factory('authService', ['$http', 'session', function ($http, session) {
        var authService = {};
        
        authService.login = function (credentials) {
            return $http
                .post('/login', credentials)
                .then(function (res) {
                    session.create(res.data.id, res.data.id, res.data.role);
                    return res.data.user;
            });
        };
        
        authService.isAuthenticated = function () {
            return !!session.userId;
        };
        
        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() && authorizedRoles.indexOf(session.userRole) !== -1);
        };
        
        return authService;
    }])
    
    .factory('authInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function ($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function (response) { 
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);
                return $q.reject(response);
            }
        };
    }]);

    return factory;
});
