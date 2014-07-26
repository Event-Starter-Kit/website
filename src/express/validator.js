(function(app){
	var logger = require("../utils/logger");
	var expressValidator = require('express-validator');
	
	app.init = function(app, express) {
		logger.info("Express: Enable validation.");
        app.use(expressValidator());
	};
})(module.exports);