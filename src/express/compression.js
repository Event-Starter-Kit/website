(function(app){
	var logger = require("../utils/logger");
	var compression = require('compression');
	
	app.init = function(app, express) {
		logger.info("Express: Enabling GZip compression.");
        
        app.use(compression({
            threshold: 512
        }));
	};
})(module.exports);