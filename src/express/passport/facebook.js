(function(strategy){
	var credentials = require("../../config/credentials").credentials;
    var logger = require("../../utils/logger");
	var facebookStrategy = require('passport-facebook').Strategy;
	var userData = require("../../data/user");

	strategy.init = function(passport){
		logger.info("Passport: Configuring Facebook Strategy.");
        passport.use(new facebookStrategy({
                clientID: credentials.social.facebook.consumerKey,
                clientSecret: credentials.social.facebook.consumerSecret,
                callbackURL: credentials.site.baseurl + "auth/facebook/callback"
            },
            function(accessToken, refreshToken, profile, next) {
            	logger.debug("Retrieving user");

            	userData.getUserByFacebookUsername(profile.username, function(err, user) {
                    if (err || !user) {
                        if (err) {
                            logger.error(err);
                            next(err, null);
                            return;
                        }

                        logger.debug("Could not find user");

                        var facebookObject = JSON.parse(profile._raw);

                        //store user into repo
                        var newUser = {
                            username: profile.username,
                            enabled: false,
                            facebook: {
                            }
                        };

                        userData.insertUser(newUser, next);
                        next(err, null);
                        return;
                    }

                    next(null, user);
                    return;
                });
            }
        ));
	};

})(module.exports);