'use strict';

define(['services/routeResolver'], function () {

    var app = angular.module(config.appName, ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'routeResolverServices', 'app.common.factory', 'app.geocode',
    'app.session', 'app.auth', 'app.map.tools', 'app.stars']);

    app.config(['$locationProvider','$routeProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
        function ($locationProvider, $routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {

            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            var route = routeResolverProvider.route;
            
            $locationProvider.html5Mode(true);
            
            var redirect = function(skip, url) {
                window.location.href = url
            };
        
            angular.forEach(routes, function (value, key) {
                if (!value.controller) {
                    $routeProvider.when(key, { redirectTo: redirect });
                } else {
                    $routeProvider.when(key, route.resolve(value.controller, value.view, value.data));
                }
            });
            
            $routeProvider.otherwise({ redirectTo: '/' });

    }])
    
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    
    .constant('USER_ROLES', {
        all: '*',
        supplier: 'supplier',
        collector: 'collector',
        contributor: 'contributor'
    });
    
    // .run(['$rootScope', 'AUTH_EVENTS', 'authService', function ($rootScope, AUTH_EVENTS, authService) {
    //     $rootScope.$on('$routeChangeStart', function (event, next) {
    //         if (next.data) {
    //             var authorizedRoles = next.data.authorizedRoles;
    //             if (!authService.isAuthorized(authorizedRoles)) {
    //                 event.preventDefault();
    //                 if (authService.isAuthenticated()) {
    //                     $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
    //                 } else {
    //                     $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
    //                 }
    //             }
    //         }
    //     });
    // }]);

    return app;
});