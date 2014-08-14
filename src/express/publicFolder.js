(function(app){
	var logger = require("../utils/logger");
	var path = require('path');

	app.enable = true;
	app.order = 1;
	
	app.init = function(app, express) {
		logger.info("Express: Setting 'Public' folder with caching maxAge: 1 Day.");
        var publicFolder = path.join(__dirname , "../public");

        logger.debug("Configuring public folder to: " + publicFolder);
        var oneYear = 31557600000;
        app.use(express.static(publicFolder, {
            maxAge: oneYear
        }));
	};
	
})(module.exports);