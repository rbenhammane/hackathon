'use strict';

define([config.appName], function (app) {

    app.controller('HeaderController', ['$rootScope', '$scope', '$modal', function ($rootScope, $scope, $modal) {
        
        $scope.showModal = function(template) {
            $rootScope.modalInstance = $modal.open({
                templateUrl: 'app/views/modals/' + template + '.html'
            });
        };
        
    }]);
});