(function(app) {
    var logger = require("../utils/logger");

    app.enable = true;
    app.order = 10;

    app.init = function(app, express) {
        app.use(function(req, res, next) {

            logger.info("Express: Enabling Conference Model.");
            var conference = require("../config/conference").conference;

            app.locals.conference = conference;

            next();
        });
    };

})(module.exports);
