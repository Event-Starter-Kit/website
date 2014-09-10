(function(controller) {

	var auth = require("../auth");

	controller.init = function(app) {
        app.get("/profile", 
			auth.ensureAuthenticated,
        	function(req, res) {
            res.render("profile/index", { });
        });
    };
    
})(module.exports);