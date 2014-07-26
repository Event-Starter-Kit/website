(function(expressConfig) {

    var logger = require("../utils/logger");

    var path = require('path');
    var expressValidator = require('express-validator');
    var mailer = require('express-mailer');

    expressConfig.init = function(app, express) {

        //setup view engine
        logger.debug("Setting 'Vash' as view engine");
        app.set("view engine", "vash");

        logger.debug("Setting 'Views' folder");
        var viewsFolder = path.dirname(module.parent.filename) + '/views';
        app.set('views', viewsFolder);

        logger.debug("Enabling GZip compression.");
        var compression = require('compression');
        app.use(compression({
            threshold: 512
        }));

        logger.debug("Setting 'Public' folder with caching maxAge: 1 Day.");
        var publicFolder = path.dirname(module.parent.filename) + "/public";
        var oneYear = 31557600000;
        app.use(express.static(publicFolder, {
            maxAge: oneYear
        }));

        logger.debug("Setting parse urlencoded request bodies into req.body.");
        var bodyParser = require('body-parser');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        logger.debug("Enable validation....");
        app.use(expressValidator());

        logger.debug("Overriding 'Express' logger");
        app.use(require('morgan')({
            "stream": logger.stream
        }));

        var credentials = require("./credentials.js").credentials;

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

        require("../controllers/").init(app);

        logger.info("Configuring 404 page");
        app.use(function(req, res, next) {
            res.statusCode = 404;
            res.description = "Not found";
            res.render("404");
        });

        logger.info("Configuring 500 page");
        app.use(function(err, req, res, next) {
            logger.error(err.stack);
            res.statusCode = 500;
            res.description = "Internal server error";
            res.render("500");
        });

    };

})(module.exports);