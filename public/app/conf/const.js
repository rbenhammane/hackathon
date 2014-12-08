'use strict';
    
var USER_ROLES = {
    all: '*',
    supplier: 'supplier',
    collector: 'collector',
    contributor: 'contributor'
};

define([], function () {

    var app = angular.module('app.const', []);

    app.constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    
    .constant('USER_ROLES', {
        all: USER_ROLES.all,
        supplier: USER_ROLES.supplier,
        collector: USER_ROLES.collector,
        contributor: USER_ROLES.contributor
    });

    return app;
});