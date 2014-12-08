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

    app.register.controller('CollectorController', ['$scope', '$sce', 'commonFactory', 'mapTools', 
        function ($scope, $sce, commonFactory, mapTools) {
            
        $scope.distance = 10;
        $scope.position = 'address';
        $scope.ratio = locationToMileRatio[$scope.distance];
        
        var location = {
            defaultLat: 33.966166,
            defaultLng: -118.151682
        };
        
        $scope.$on('$viewContentLoaded', function(){
            mapTools.initMap(location.defaultLat, location.defaultLng, $scope.ratio.zoom);
        });
        
        
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
                supplier.infoWindowContent = '<h3>' + supplier.name + '</h3><br ><span class="badge">' + $scope.getRandomNumber(500, 0) + '</span> requests available<br >&nbsp;';
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
        
        var donatorsCallback = function(donators) {
            $scope.donators = donators;
            
            var messages = [
                '<h3>Meal</h3><br >I have some food to donate, I\'available at home until 11:00am',
                '<h3>Salad</h3><br >One salad that I couldn\'t eat, still fresh',
                '<h3>Chicken</h3><br >Chicken meal for 4 persons',
                '<h3>Meal</h3><br >Hi',
                '<h3>Salad</h3><br >If someone is available, please come, I have some food to donate',
                '<h3>Sandwich</h3><br >Food to donate',
                '<h3>Meal</h3><br >Food!!',
                '<h3>Chicken</h3><br >...',
                '<h3>Meat</h3><br >Meat Sandwich',
                '<h3>Meat</h3><br >Surprise!'
            ];
            
            var count = $scope.getRandomNumber(10, 0);
            
            donators.forEach(function(donator) {
                donator.countWeek = $scope.getRandomNumber(30, donator.stars);
                donator.total = $scope.getRandomNumber(500, donator.countWeek);
                if (count == 0) {
                    return;
                } else {
                    count--;
                }
                
                donator.infoWindowContent = messages[$scope.getRandomNumber(9, 0)];
                var lat = location.defaultLat + Math.round((Math.random() * $scope.ratio.value - $scope.ratio.value / 2) * 1000000) / 10000000;
                var lng = location.defaultLng + Math.round((Math.random() * $scope.ratio.value - $scope.ratio.value / 2) * 1000000) / 10000000;
            
                var myLatlng = new google.maps.LatLng(lat, lng);
                    
                var marker = new google.maps.Marker({ 
                    position: myLatlng,
                    title: 'Meal',
                    animation: google.maps.Animation.DROP
                });
                
                mapTools.displayMarker(marker, donator.infoWindowContent);
            });
        };
        
        var rerenderMap = function() {

            mapTools.resetMarkers();
            
            commonFactory.suppliers($scope.ratio.limit, suppliersCallback);
        
            commonFactory.donators(donatorsCallback);
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
        
        commonFactory.donators(donatorsCallback);
    }]);

});