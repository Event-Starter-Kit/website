(function(controller) {

	controller.init = function(app) {
        app.get("/admin", function(req, res) {
            res.render("admin/index", {
               applicationName: "Web European Conference",
                title: "Web European Conference"
            });
        });
    };
    
})(module.exports);