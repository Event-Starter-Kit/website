(function(app) {
    var logger = require("../utils/logger");

    app.enable = true;
    app.order = 11;

    app.init = function(app, express) {
        app.use(function(req, res, next) {

            logger.info("Express: Enabling session model.");
            var conference = require("../config/conference").conference;

            res.locals.user = req.user;

            next();
        });
    };

})(module.exports);
