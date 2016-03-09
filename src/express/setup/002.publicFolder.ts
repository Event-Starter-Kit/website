import { Interfaces } from "../interfaces";
import * as Express from "express";
import * as Path from "path";

export class PublicFolder extends Interfaces.ConfigurationModule<Express.Application> {
	constructor(app: Express.Application) {
		super(app, true);
	}

	public setup() {
		this.logger.debug("Setting 'Public' folder with caching maxAge: 1 Day.");
        let publicFolder = Path.dirname(module.parent.parent.filename) + "/public";
        let oneYear = 31557600000;
        this.app.use(Express.static(publicFolder, {
            maxAge: oneYear,
        }));

		this.logger.debug("'Public' folder configured.");
	}
}
