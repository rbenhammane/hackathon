require.config({
    waitSeconds: 0,
	baseUrl: '/app',
	paths: {
	    uibootstrap: '../resources/js/lib/ui-bootstrap-tpls-0.12.0.min'
	}
});

require(
	[
        'uibootstrap',
        'conf/const',
		'conf/config',
        'conf/routes',
		'app',
		'services/routeResolver',
		'services/commonFactory',
		'services/geocodeFactory',
		'services/authFactory',
		'services/sessionService',
		'services/mapService',
		'controllers/LoginController',
		'controllers/HeaderController',
		'controllers/ApplicationController',
		'directives/starsDirective'
	],
	function () {
		angular.bootstrap(document, [config.appName]);
});