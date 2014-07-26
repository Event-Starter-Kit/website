(function(auth) {

    //TODO: 
    //	Add the correct url... From configuration????
    //	Store the user into the repository (right now the repository is missing)

    var credentials = require("../config/credentials").credentials;
    var logger = require("../utils/logger");
    var hasher = require("../utils/hasher");
    var passport = require('passport');
    var twitterStrategy = require('passport-twitter').Strategy;

    passport.use(new twitterStrategy({
            consumerKey: credentials.social.twitter.consumerKey,
            consumerSecret: credentials.social.twitter.consumerSecret,
            callbackURL: "http://www.example.com/auth/twitter/callback"
        },
        function(token, tokenSecret, profile, done) {
            //store user into repo
        }
    ));

    auth.init = function(app,database) { 

        logger.info("Configuring Passport middleware for Express");
        app.use(passport.initialize());
        app.use(passport.session());
    };

})(module.exports);
