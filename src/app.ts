import { LoggerBaseClass } from "./loggerBaseClass";
import { Environment } from "./config/environment";
import { ExpressConfig } from "./config/express";

import * as Express from "express";
import * as _ from "underscore";

class Startup extends LoggerBaseClass {
    private app: Express.Express;

    constructor() {
		//Parsing environment variables
        let env = _.find(process.argv.slice(2), (arg) => {
            if (arg.indexOf("env") === 0) {
                return true;
            }
        });
        Environment.Env = (env !== undefined)
            ? env.substr(4, 3)
            : "prod";

        super();
        this.ConfigureExpress();
    }

	public Run() {
        let port = process.env.port || 5000;

        this.app.listen(port, () => {
            this.Logger.info("Listening on " + port);
        });
    }

    private ConfigureExpress() {
        this.app = Express();

        this.Logger.info("configuring express....");
        new ExpressConfig(this.app).Configure();
        this.Logger.info("Express configured");
    }
}

let srt = new Startup();
srt.Run();