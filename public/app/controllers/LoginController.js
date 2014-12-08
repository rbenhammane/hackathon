'use strict';

define([config.appName], function (app) {

    app.controller('LoginController', ['$scope', '$modal', function ($scope, $modal) {
        
        $scope.showLogin = function() {
            $scope.modalInstance = $modal.open({
                templateUrl: 'app/views/loginModal.html',
                controller: 'LoginModalController'
            });
        };
        
    }])
    
    .controller('LoginModalController', ['$rootScope', '$scope', 'AUTH_EVENTS', 'authService', function($rootScope, $scope, AUTH_EVENTS, authService) {
        
        $scope.credentials = {
            username: '',
            password: ''
        };
        $scope.login = function (credentials) {
            authService.login(credentials).then(function (user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.setCurrentUser(user);
                $rootScope.modalInstance.close();
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
    }]);
});