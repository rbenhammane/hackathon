'use strict';

define([], function () {

    var module = angular.module('app.map.tools', ['app.geocode']);
    
    module.service('mapTools', ['geocode', function (geocode) {
        
        var service = this;
        
        this.initMap = function(defaultLat, defaultLng, zoom) {
            var containers = document.getElementsByClassName('map-container');
            
            var mapCanvas = containers[containers.length - 1];
            
            var mapOptions = {
                center: new google.maps.LatLng(defaultLat, defaultLng),
                zoom: zoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            
            service.map = new google.maps.Map(mapCanvas, mapOptions);
            service.markers = [];
        };
        
        this.moveMapTo = function(lat, lng) {
            var myLatlng = new google.maps.LatLng(lat, lng);
            service.map.panTo(myLatlng);  
        };
        
        this.zoomMap = function(zoom) {
            service.map.setZoom(zoom);
        };
        
        this.loadDefaultLocation = function(location, callback, position, address) {
        
            if (position == 'gps') {
                var GetLocation = function (newLocation) {
                    location.defaultLat = newLocation.coords.latitude;
                    location.defaultLng = newLocation.coords.longitude;
                    service.moveMapTo(newLocation.coords.latitude, newLocation.coords.longitude);
                    callback();
                };
                navigator.geolocation.getCurrentPosition(GetLocation);
            } else {
                geocode.getLatLng(address, function(response) {
                    if (response.status == 'OK') {
                        location.defaultLat = response.results[0].geometry.location.lat;
                        location.defaultLng = response.results[0].geometry.location.lng;
                        service.moveMapTo(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng);
                        callback();
                    }
                });
            }
        };
        
        this.centerToMarker = function(marker, content) {
            if (service.infowindow) {
                service.infowindow.close();
            }
            
            service.infowindow = new google.maps.InfoWindow({
                content: content,
                maxWidth: 200
            });
            
            service.infowindow.open(service.map, marker);
            service.map.panTo(marker.getPosition());  
        };
        
        this.displayMarker = function(marker, content) {
            
            marker.setMap(service.map);
            
            service.markers.push(marker);
            
            google.maps.event.addListener(marker, 'click', function() {
                service.centerToMarker(marker, content);
            });
        };
        
        this.resetMarkers = function() {
            service.markers.forEach(function(marker) {
                marker.setMap(null);
            });
            service.markers = [];
        };
        
        return this;
    }]);

    return module;
});
