(function(app) {
    var logger = require("../utils/logger");
    var session = require('express-session');
    var credentials = require("../config/credentials.js").credentials;

    app.enable = true;
    app.order = 4;

    app.init = function(app, express) {
        logger.info("Express: Configuring 'Express' session");
        app.use(session({
            secret: credentials.session.secretPhrase,
            saveUninitialized: true,
            resave: true
        }));
    };

})(module.exports);
