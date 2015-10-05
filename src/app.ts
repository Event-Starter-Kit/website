/* global GLOBAL */
/// <reference path="../typings/express/express.d.ts"/>

import * as express from 'express';
import * as _ from 'underscore';
import * as winston from 'winston';
import * as loggerModule from './utils/logger';
import * as environment from './config/environment';

class startup {
    private logger: winston.LoggerInstance;
    private app: express.Express;

    constructor() {
        this.parseEnvironment();
        this.configureLogger();
        this.configureExpress();
    }

    private parseEnvironment() {
        var env = _.find(process.argv.slice(2), (arg) => {
            if (arg.indexOf('env') === 0) {
                return true;
            }
        });

        GLOBAL.env = (env !== undefined)
            ? env.substr(4, 3)
            : 'prod';
    }

    private configureLogger() {
        loggerModule.factory.configure();
        this.logger = loggerModule.factory.logger();

        this.logger.info("Logger Up & Running....");
        this.logger.info("Environment: " + (environment.isDevEnvironment ? 'Dev' : 'Production'));
    }

    private configureExpress() {
        this.app = express();
        
        /*
        var expressConfig = require("./config/express");
        
        logger.info("configuring express....");
        expressConfig.init(app, express);
        logger.info("Express configured");
        
        */
    }

    public run() {
        var port = process.env.port || 5000;

        this.app.listen(port, function() {
            this.logger.info("Listening on " + port);
        });
    }
}

var srt = new startup();
srt.run();




