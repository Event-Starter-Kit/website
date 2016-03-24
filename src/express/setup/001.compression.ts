import * as Interfaces from "../../interfaces";
import * as Express from "express";
import * as expressCompression from "compression";

export class Compression extends Interfaces.ConfigurationModule<Express.Application> {
	constructor(app: Express.Application) {
		super(app, true);
	}

	public setup() {
		this.logger.debug("Enabling GZip compression.");

        this.app.use(expressCompression({
            threshold: 512,
        }));

		this.logger.debug("GZip compression enabled.");
	}
}

