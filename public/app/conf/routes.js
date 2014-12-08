
var routes = {

	"/": {
		controller: "Index", 
		view: "index"
	},
	"/guest": {
		controller: "Index", 
		view: "index"
	},
	"/donator": {
		controller: "Donator", 
		view: "donator"
	},
	"/collector": {
		controller: "Collector", 
		view: "collector"
	},
	"/supplier": {
		controller: "Supplier", 
		view: "supplier"
	},
	"/auth/:type": {},  
	"/error": {
		controller: "Error", 
		error: "404", 
		view: "error"
	}

}