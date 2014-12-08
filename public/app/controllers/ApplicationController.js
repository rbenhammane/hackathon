'use strict';

define([config.appName], function (app) {

    app.controller('ApplicationController', ['$rootScope', '$scope', '$location', 'USER_ROLES', 'authService', 
    function ($rootScope, $scope, $location, USER_ROLES, authService) {
        $rootScope.currentUser = null;
        $rootScope.userRoles = USER_ROLES;
        $rootScope.isAuthorized = authService.isAuthorized;
        
        $rootScope.setCurrentUser = function (user) {
            $rootScope.currentUser = user;
        };
        
        $scope.getRandomNumber = function(max, offset) {
            return Math.floor(Math.random() * max) + parseInt(offset);
        };
        
        $rootScope.modalInstance = null;
        
        $rootScope.cancel = function () {
            $rootScope.modalInstance.dismiss('cancel');
        };
        
        $scope.role = 'guest';
        $scope.go = function ( path ) {
            $location.path( path );
        };
    }]);
});