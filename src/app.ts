import { loggerBaseClass } from './loggerBaseClass';
import { loggerFactory } from './utils/LoggerFactory';
import { environment } from './config/environment';
import { expressConfig } from './config/express';

import * as express from 'express';
import * as _ from 'underscore';

class startup extends loggerBaseClass {
    private app: express.Express;

    constructor() {

        this.parseEnvironment();
 
        super();

        this.logger.info("Logger Up & Running....");
        this.logger.info("Environment: " + (environment.isDevEnvironment ? 'Dev' : 'Production'));
        this.configureExpress();
    }

    private parseEnvironment() {
        var env = _.find(process.argv.slice(2), (arg) => {
            if (arg.indexOf('env') === 0) {
                return true;
            }
        });
       
        environment.env = (env !== undefined)
            ? env.substr(4, 3)
            : 'prod';
    }

    private configureExpress() {
        this.app = express();

        this.logger.info("configuring express....");
        new expressConfig(this.app).configure()
        this.logger.info("Express configured");
    }

    public run() {
        var port = process.env.port || 5000;

        this.app.listen(port, () => {
            this.logger.info("Listening on " + port);
        });
    }
}

var srt = new startup();
srt.run();




