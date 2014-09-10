(function(controller) {

    var passport = require('passport');
    var userData = require("../data/userRepository");

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
                failureRedirect: '/login',
                session: true
            }));

        app.post('/auth/user/register', function(req, res) {

            req.assert('username', 'Field required').notEmpty();

            req.assert('email', 'Field required').notEmpty();
            req.assert('email', 'Invalid email format').isEmail();

            req.assert('bio', 'Field required').notEmpty();
            req.assert('website', 'Field required').notEmpty();
            req.assert('website', 'Wrong url format').isURL();

            req.assert('location', 'Field required').notEmpty();

            var errors = req.validationErrors();
            var mappedErrors = req.validationErrors(true);

            if (errors) {
                logger.warn("Wrong request: ", errors);
                res.json(400, errors);
                return;
            }

            userData.getUser(req.body.username, function(err, user) {
                if (!user) {
                    next(err, null);
                    return;
                }

                user.email = req.body.email;
                user.bio = req.body.bio;
                user.website = req.body.website;
                user.location = req.body.location;

                userData.updateUser(user);
                next(err, null);

                res.redirect('/');
            });

        });
    };

})(module.exports);
