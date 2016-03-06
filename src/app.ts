import { LoggerBaseClass } from "./loggerBaseClass";
import { ExpressConfig } from "./config/ExpressConfig";

import * as Express from "express";
import * as _ from "underscore";

class Startup extends LoggerBaseClass {
    private app: Express.Express;

    constructor() {
        super();
        this.ConfigureExpress();
    }

	public Run() {
        let port = process.env.PORT || 5000;

        this.app.listen(port, () => {
            this.Logger.info("Listening on " + port);
        });
    }

    private ConfigureExpress() {
        this.app = Express();

        this.Logger.debug("configuring express....");
        new ExpressConfig(this.app).Configure();
        this.Logger.debug("Express configured");
    }
}

let srt = new Startup();
srt.Run();




