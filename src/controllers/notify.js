(function (notifyController) {
    'use strict';
    var logger = require('../utils/logger');
    //var debug = require('express-debug');

    notifyController.init = function (app) {

        var credentials = require("../config/credentials.js").credentials;
        var mcapi = require('mailchimp-api');

        var mailChimpAPI;

        try {
            
            logger.debug("MailChimp API Key: " +credentials.mailchimp.key);
            // set MailChimp API key here
            mailChimpAPI = new mcapi.Mailchimp(credentials.mailchimp.key);
        } catch (error) {
            logger.error(error.message);
        }

        app.post('/api/notify/join', function (req, res) {

            logger.debug('email value: ' + req.body.email);

            req.assert('email', 'Field required').notEmpty();
            req.assert('email', 'Invalid email format').isEmail();

            var errors = req.validationErrors();

            if (errors) {
                logger.warn("Wrong request: ", errors);
                return res.json(400, errors);
            }

            if (mailChimpAPI) {

                mailChimpAPI.lists.subscribe({
                        id: credentials.mailchimp.listId,
                        email: {
                            email: req.body.email
                        }
                    }, function (data) {
                        logger.debug(data);
                        res.send({
                            message: "Thanks for signing up!"
                        });
                    }, function (error) {

                        if (error) {
                            if (error.code == 214) {
                                logger.debug("User already subscribed");
                                res.status(400).send({
                                    error: "User already subscribed"
                                });
                            } else {
                                logger.error("There is an error calling MailChimp: " + error.error );
                                res.status(500).send({
                                    error: "Something went wrong. Please try again. " + error.error
                                });
                            }
                        }
                    });

            } else {
                res.status(500).send({
                    error: "Failed to start MailChimp API"
                });
            }
        });


        app.post('/api/contact/', function (req, res) {

            req.assert('name', 'Field required').notEmpty();
            req.assert('comments', 'Field required').notEmpty();
            req.assert('email', 'Field required').notEmpty();
            req.assert('email', 'Invalid email format').isEmail();

            var errors = req.validationErrors();

            if (errors) {
                logger.warn("Wrong request: ", errors);
                res.json(400, errors);

                return;
            }

            var model = {
                name: req.body.name,
                email: req.body.email,
                message: req.body.comments
            };

            app.mailer.send('email/contact', {
                from: req.body.email,
                to: 'info@webnetconf.eu',
                subject: 'New contact from website.', // REQUIRED.
                otherProperty: model
            }, function (err) {
                if (err) {
                    // handle error
                    logger.error(err);

                    res.status(500).send({
                        error: 'There was an error sending the email'
                    });

                    return;
                }
            });

            app.mailer.send('email/responder', {
                from: 'info@webnectconf.eu',
                to: req.body.email,
                subject: 'Web European Conference'
            }, function (err) {
                if (err) {
                    // handle error
                    logger.error(err);

                    res.status(500).send({
                        error: 'There was an error sending the email'
                    });

                    return;
                }
            });

            logger.log('info', 'Email Sent', model);
            res.status(200).send({
                message: 'Email Sent!'
            });
        });
    };

})(module.exports);