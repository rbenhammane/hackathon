'use strict';

define([config.appName], function (app) {
    
    var locationToMileRatio = {
        '10': {
            'value': 1.45,
            'zoom': 12,
            'limit': 3
        },
        '20': {
            'value': 2.9,
            'zoom': 11,
            'limit': 5
        },
        '30': {
            'value': 4.35,
            'zoom': 11,
            'limit': 7
        }
    };

    app.register.controller('IndexController', ['$scope', '$sce', 'commonFactory', 'mapTools', 
        function ($scope, $sce, commonFactory, mapTools) {
            
        $scope.distance = 10;
        $scope.position = 'address';
        $scope.ratio = locationToMileRatio[$scope.distance];
        
        var location = {
            defaultLat: 33.966166,
            defaultLng: -118.151682
        };
        
        mapTools.initMap(location.defaultLat, location.defaultLng, $scope.ratio.zoom);
        
        $scope.$watch('position', function(newValue, oldValue) {
            
            if (oldValue === newValue) return;
            
            if (newValue == 'gps') {
                mapTools.loadDefaultLocation(location, rerenderMap, newValue);
            }
        });
        
        $scope.goToAddress = function(address) {
            mapTools.loadDefaultLocation(location, rerenderMap, address);
        };
        
        var suppliersCallback = function(suppliers) {
            $scope.suppliers = suppliers;
            
            suppliers.forEach(function(supplier) {
                supplier.description = $sce.trustAsHtml(supplier.description);
                supplier.meals = $scope.getRandomNumber(1000, 0);
                var meals = supplier.meals;
                var salads = $scope.getRandomNumber(meals, 0);
                meals -= salads;
                var meat = $scope.getRandomNumber(meals, 0);
                meals -= meat;
                var chicken = $scope.getRandomNumber(meals, 0);
                meals -= chicken;
                var sandwitch = meals;
                
                supplier.infoWindowContent = '<h3>' + supplier.name + '</h3><br >' + supplier.description  +
                    '<table class="foods">' +
                    '<tr><td>Salads</td><td>' + salads + '</td></tr>' +
                    '<tr><td>Sandwichs</td><td>' + sandwitch + '</td></tr>' +
                    '<tr><td>Meat meals</td><td>' + meat + '</td></tr>' +
                    '<tr><td>Chicken meals</td><td>' + chicken + '</td></tr>' +
                    '</table>';
                var lat = location.defaultLat + Math.round((Math.random() * $scope.ratio.value - $scope.ratio.value / 2) * 1000000) / 10000000;
                var lng = location.defaultLng + Math.round((Math.random() * $scope.ratio.value - $scope.ratio.value / 2) * 1000000) / 10000000;
            
                var myLatlng = new google.maps.LatLng(lat, lng);
                    
                var marker = new google.maps.Marker({ 
                    position: myLatlng,
                    title: supplier.name,
                    icon: supplier.logo,
                    animation: google.maps.Animation.DROP
                });
                
                supplier.marker = marker;
                
                mapTools.displayMarker(marker, supplier.infoWindowContent);
            });
        };
        
        var rerenderMap = function() {

            mapTools.resetMarkers();
            
            commonFactory.suppliers($scope.ratio.limit, suppliersCallback);
        };
        
        $scope.$watch('distance', function(newValue, oldValue) {
            
            if (oldValue === newValue) return;
            
            $scope.ratio = locationToMileRatio[$scope.distance];
            
            mapTools.zoomMap($scope.ratio.zoom);
            
            rerenderMap();
        });
        
        $scope.centerToMarker = function(supplier) {
            mapTools.centerToMarker(supplier.marker, supplier.infoWindowContent);
        };
        
        commonFactory.suppliers($scope.ratio.limit, suppliersCallback);
    }]);

});