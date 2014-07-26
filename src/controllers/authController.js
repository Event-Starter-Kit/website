(function(controller) {

	var passport = require('passport');

    controller.init = function(app) {
        // Redirect the user to Twitter for authentication.  When complete, Twitter
        // will redirect the user back to the application at
        //   /auth/twitter/callback
        app.get('/auth/twitter', app.passport.authenticate('twitter'));

        // Twitter will redirect the user to this URL after approval.  Finish the
        // authentication process by attempting to obtain an access token.  If
        // access was granted, the user will be logged in.  Otherwise,
        // authentication has failed.
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect: '/',
                failureRedirect: '/login'
            }));
    };

})(module.exports);
