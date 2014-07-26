(function(app){
	var logger = require("../utils/logger");
	var credentials = require("../config/credentials.js").credentials;
    var mailer = require('express-mailer');

	app.init = function(app, express) {
        logger.info("Express: Configuring 'Mailer';");

        mailer.extend(app, {
            host: credentials.mailer.host,
            secureConnection: credentials.mailer.secureConnection,
            port: credentials.mailer.port,
            transportMethod: 'SMTP',
            auth: {
                user: credentials.mailer.username,
                pass: credentials.mailer.password
            }
        });
	};
})(module.exports);