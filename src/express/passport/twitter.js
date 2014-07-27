(function(strategy){

	var credentials = require("../../config/credentials").credentials;
    var logger = require("../../utils/logger");
	var twitterStrategy = require('passport-twitter').Strategy;
	var userData = require("../../data/user");

	strategy.init = function(passport){
		logger.info("Passport: Configuring Twitter Strategy.");
        passport.use(new twitterStrategy({
                consumerKey: credentials.social.twitter.consumerKey,
                consumerSecret: credentials.social.twitter.consumerSecret,
                callbackURL: credentials.site.baseurl + "auth/twitter/callback"
            },
            function(token, tokenSecret, profile, next) {
                logger.debug("Retrieving user");

                userData.getUserByTwitterUsername(profile.username, function(err, user) {
                    if (err || !user) {
                        if (err) {
                            logger.error(err);
                            next(err, null);
                            return;
                        }

                        logger.debug("Could not find user");

                        var twitterObject = JSON.parse(profile._raw);

                        //store user into repo
                        var newUser = {
                            username: profile.username,
                            enabled: false,
                            twitter: {
                                token: token,
                                tokenSecret: tokenSecret,
                                username: profile.username,
                                profileImageUrl: profile._raw.profile_image_url,
                                id: profile.id,
                                name: twitterObject.name,
                                location: twitterObject.location,
                                description: twitterObject.description,
                                url: twitterObject.url,
                                followersCount: twitterObject.followers_count,
                                followinfCount: twitterObject.friends_count
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