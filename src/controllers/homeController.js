(function(controller) {

	var logger = require("../utils/logger");

    controller.init = function(app) {
        app.get("/", function(req, res) {
        	
            res.render("home/index", {
                applicationName: "Web European Conference",
                title: "Web European Conference",
                user: req.user
            });
        });
    };

})(module.exports);
