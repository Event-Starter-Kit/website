(function(app){
	var logger = require("../utils/logger");
	var path = require('path');
	
	app.init = function(app, express) {
		logger.info("Express: Setting 'Public' folder with caching maxAge: 1 Day.");
        var publicFolder = path.dirname(module.parent.filename) + "/public";
        var oneYear = 31557600000;
        app.use(express.static(publicFolder, {
            maxAge: oneYear
        }));
	};
})(module.exports);