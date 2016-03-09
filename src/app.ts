import { LoggerBaseClass } from "./logging/loggerBaseClass";
import { ExpressConfig } from "./config/expressConfig";

import * as Express from "express";

class Startup extends LoggerBaseClass {
    private app: Express.Express;

    constructor() {
        super();
        this.configureExpress();
    }

	public Run() {
        let port = process.env.PORT || 5000;

        this.app.listen(port, () => {
            this.logger.info("Listening on " + port);
        });
    }

    private configureExpress() {
        try {
			this.app = Express();

			this.logger.debug("configuring express....");
			new ExpressConfig(this.app).configure();
			this.logger.debug("Express configured");
		} catch (error) {
			this.logger.error("Error configuring Express", error);
		}
    }
}

let srt = new Startup();
srt.Run();




