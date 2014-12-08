'use strict';

define([], function () {
    
    angular.module('app.stars', [])
    
    .directive('stars', function() {
        return function(scope, elm, attrs) {
            var star = '<i class="fa fa-star"></i>';
            var stars = attrs.stars;
            
            var text = '';
            for (var i = 0; i < stars; i++) {
                text += star;
            }
            
            elm.html(text);
        };
    });
});