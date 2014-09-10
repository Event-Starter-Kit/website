(function(controller) {

	var logger = require("../utils/logger");

    controller.init = function(app) {
        app.get("/speakers", function(req, res) {
        	
            res.render("speakers/index", { });
        });
    };

})(module.exports);
