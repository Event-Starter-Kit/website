import { LoggerBaseClass } from "./LoggerBaseClass";
import { ExpressConfig } from "./Config/ExpressConfig";

import * as Express from "express";

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
        try {
			this.app = Express();

			this.Logger.debug("configuring express....");
			new ExpressConfig(this.app).Configure();
			this.Logger.debug("Express configured");
		} catch (error) {
			this.Logger.error("Error configuring Express", error);
		}
    }
}

let srt = new Startup();
srt.Run();




