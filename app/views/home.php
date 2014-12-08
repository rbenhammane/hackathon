<!doctype html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<title>Food Gatherer</title>
    <link rel="stylesheet/less" href="/resources/less/styles.less">
    <script src="/resources/js/lib/less.min.js"></script>
</head>
<body data-ng-controller="ApplicationController">

	<header class="container-fluid" data-ng-include src="'app/views/header.html'"></header>

    <main class="container-fluid" data-ng-view></main>

    <footer class="container-fluid" data-ng-include src="'app/views/footer.html'"></footer>

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.27/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.27/angular-route.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.27/angular-animate.min.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js"></script>

	<script src="/resources/js/lib/requirejs/require.min.js" data-main="/app/main"></script>
</body>
</html>
