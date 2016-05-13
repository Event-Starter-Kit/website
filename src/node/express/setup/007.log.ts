import * as Interfaces from "../../interfaces";
import { Application} from "express";
const morgan = require("morgan");

export class Log extends Interfaces.ConfigurationModule<Application> {
	constructor(app: Application) {
		super(app, true);
	}

	public setup() {
		this.logger.debug("Configuring Express logging.");
		this.app.use(morgan("combined", {
            "stream": {
                write: (message: string, encoding: any) => {
                    this.logger.info(message);
                },
            },
        }));
		this.logger.debug("Express logging configured.");
	}
}
