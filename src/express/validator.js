(function(app){
	var logger = require("../utils/logger");
	var expressValidator = require('express-validator');

	app.enable = true;
    app.order = 8;
	
	app.init = function(app, express) {
		logger.info("Express: Enable validation.");
        app.use(expressValidator());
	};
	
})(module.exports);