(function(controllers) {
    var logger = require("../utils/logger");
    var requires = require("../utils/requireAll");
    var middlewares = requires.requireAll(__dirname + '/');
    var _ = require("underscore");

    controllers.init = function(app, express) {

        var orderedMiddlewares = _.sortBy(middlewares, function(middleware){ 
            return middleware.order; 
        });

        orderedMiddlewares = _.filter(orderedMiddlewares, function(middleware){ 
            return middleware.enable === true; 
        });


        orderedMiddlewares.forEach(function(middleware) {
            middleware.init(app, express);
        });

        require("../controllers/").init(app);
        require("../apis/").init(app);

        logger.info("Configuring 404 page");
        app.use(function(req, res, next) {
            res.statusCode = 404;
            res.description = "Not found";
            res.render("404");
        });

        logger.info("Configuring 500 page");
        app.use(function(err, req, res, next) {
            logger.error(err.stack);
            res.statusCode = 500;
            res.description = "Internal server error";
            res.render("500",{stack: err.stack});
        });
    };
})(module.exports);
