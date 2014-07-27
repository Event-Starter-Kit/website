(function(app){
	var logger = require("../utils/logger");
	var morgan = require('morgan');

	app.enable = true;
    app.order = 0;

	app.init = function(app, express) {
		logger.info("Express: Overriding 'Express' logger");
		
	    app.use(morgan("combined",{
	        "stream": logger.stream
	    }));
	};
})(module.exports);