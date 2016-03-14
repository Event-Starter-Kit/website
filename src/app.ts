import { LoggerBaseClass } from "./logging/loggerBaseClass";
import { Folder } from "./utils/folder";

import * as Express from "express";

class Startup extends LoggerBaseClass {
    private app: Express.Application;

    constructor() {
        super();
        this.configureExpress();
    }

	public run() {
        let port = process.env.PORT || 5000;

        this.app.listen(port, () => {
            this.logger.info("Listening on " + port);
        });
    }

    private configureExpress() {
        try {
			this.logger.debug("Initializing express");
			this.app = Express();

			let module = new Folder().requireAll(__dirname + "/express/setup/");

			module.forEach((exp) => {
				let module = new exp[Object.keys(exp)[0]](this.app);

				if (module.enabled) {
					module.setup();
				}
			});
		} catch (error) {
			this.logger.error("Error configuring Express", error);
		}
    }
}

let srt = new Startup();
srt.run();




