(function(app){
	var logger = require("../utils/logger");
	var cookieParser = require('cookie-parser');

	app.enable = true;
	app.order = 2;

	app.init = function(app, express) {
		logger.info("Express: Confguring Cookie Parser.");
		app.use(cookieParser());
	};
	
})(module.exports);