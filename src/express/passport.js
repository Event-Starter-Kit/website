(function(app) {
    var credentials = require("../config/credentials").credentials;
    var requires = require("../utils/requireAll");
    var logger = require("../utils/logger");
    var hasher = require("../utils/hasher");
    var passport = require('passport');
    var githubStrategy = require('passport-github').Strategy;
    var userData = require("../data/userRepository");

    app.enable = true;
    app.order = 5;

    app.init = function(app, express) {
        var strategies = requires.requireAll(__dirname + '/passport/');

        strategies.forEach(function(strategy) {
            strategy.init(passport);
        });
        
        logger.info("Passport: Setup Authentication ('Serialize User').");
        passport.serializeUser(function(user, next) {
            logger.debug("Serializing user.");
            next(null, user.username);
        });

        logger.info("Passport: Setup Authentication ('Deserialize User').");
        passport.deserializeUser(function(key, next) {

            logger.debug("Deserializing user. Username: " + key);

            userData.getUser(key, function(err, user) {
                if (err || !user) {
                    next(null, false, {
                        message: "Could not find user"
                    });
                } else {
                    next(null, user);
                }
            });
        });

        logger.info("Express: Configuring Passport middleware for Express");
        app.use(passport.initialize());
        app.use(passport.session());

        app.passport = passport;
    };
})(module.exports);
