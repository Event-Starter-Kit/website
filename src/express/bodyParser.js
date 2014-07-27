(function(app){
	var logger = require("../utils/logger");
	var bodyParser = require('body-parser');

	app.enable = true;
	app.order = 3;
	
	app.init = function(app, express) {
		logger.info("Express: Setting parse urlencoded request bodies into req.body.");
        
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
	};

})(module.exports);