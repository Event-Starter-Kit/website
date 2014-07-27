(function(app){
	var logger = require("../utils/logger");
	var path = require('path');

	app.enable = true;
    app.order = 9;
	
	app.init = function(app, express) {
		//setup view engine
        logger.info("Setting 'Vash' as view engine");
        app.set("view engine", "vash");

        logger.info("Setting 'Views' folder");
        var viewsFolder = path.dirname(module.parent.parent.parent.filename) + '/views';
        logger.debug("ViewPath: "+ viewsFolder);
        app.set('views', viewsFolder);
	};
})(module.exports);