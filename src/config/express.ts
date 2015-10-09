import { loggerFactory } from '../utils/LoggerFactory';
import { loggerBaseClass } from '../loggerBaseClass';

import * as credentials from '../config/credentials';
import * as winston from 'winston';
import * as express from 'express';
import * as path from 'path';
import * as compression from 'compression';
import * as expressValidator from 'express-validator';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as csrf from 'csurf';

export class expressConfig extends loggerBaseClass {
    private app: express.Express;

    constructor(app: express.Express) {
        super();
        
        this.app = app;
    }

    configure() {
        this.configureViewEngine();
        this.configureViewFolder();
        this.configureCompression();
        this.configurePublicFolder();
        this.configureBodyParser();
        this.configureValidator();
        this.configureCookieParser();
        this.configureSession();
        this.configureCsurf();
        
        //need to add logger stream to express js
        //need to initialized the controllers
        
        this.configure404();
        this.configure500();
    }

    private configureViewEngine() {
        this.logger.debug("Setting 'Vash' as view engine");
        this.app.set("view engine", "vash");
    }

    private configureViewFolder() {
        this.logger.debug("Setting 'Views' folder");
        var viewsFolder = path.dirname(module.parent.filename) + '/views';
        this.app.set('views', viewsFolder);
    }

    private configureCompression() {
        this.logger.debug("Enabling GZip compression.");

        this.app.use(compression({
            threshold: 512
        }));
    }

    private configurePublicFolder() {
        this.logger.debug("Setting 'Public' folder with caching maxAge: 1 Day.");
        var publicFolder = path.dirname(module.parent.filename) + "/public";
        var oneYear = 31557600000;
        this.app.use(express.static(publicFolder, {
            maxAge: oneYear
        }));
    }

    private configureBodyParser() {
        this.logger.debug("Setting parse urlencoded request bodies into req.body.");
        var bodyParser = require('body-parser');
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    }

    private configureValidator() {
        this.logger.debug("Enabling validation....");
        this.app.use(expressValidator());
    }

    private configureCookieParser() {
        this.logger.debug("Enabling cookie parser....");
        this.app.use(cookieParser());
    }

    private configureSession() {
        this.logger.debug("Enabling session....");
        this.app.use(session({
            secret: credentials.session.secretPhrase,
            saveUninitialized: true,
            resave: true
        }));
    }

    private configureCsurf() {
        this.logger.debug("Enabling csurf....");
        this.app.use(csrf());
    }

    private configure404() {
        this.logger.info("Configuring 404 page");
        this.app.use((err: any, req: express.Request, res: express.Response, next: Function) => {
            this.logger.debug("Unable to locate the specified url: "+ req.url);
            res.statusCode = 404;
            res.render("404");
        });
    }

    private configure500() {
        this.logger.info("Configuring 500 page");
        this.app.use((err: any, req: express.Request, res: express.Response, next: Function) => {
            this.logger.error(err.stack);
            res.statusCode = 500;
            res.render("500");
        });
    }
}


/*
(function(expressConfig) {

    var logger = require("../utils/logger");

    var path = require('path');
    var expressValidator = require('express-validator');
    
    var credentials = require("./credentials.js").credentials;
    
    

    expressConfig.init = function(app, express) {      


        logger.debug("Overriding 'Express' logger");
        app.use(require('morgan')("combined",{
            "stream": logger.stream
        }));
        
        


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
    
        

        
    };

})(module.exports);
*/