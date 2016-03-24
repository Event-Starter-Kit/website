import * as Interfaces from "../../interfaces";
import { Application} from "express";
import * as PassportMiddleware from "passport";
import { Folder } from "../../utils/folder";

export class Passport extends Interfaces.ConfigurationModule<Application> {
	constructor(app: Application) {
		super(app, true);
	}

	public setup() {
		let modules = new Folder().requireAll(__dirname + "/../passport/");

		modules.forEach((m) => {
			let module = new m[Object.keys(m)[0]](PassportMiddleware);

			if (module.enabled) {
				module.setup();
			}
        });

		this.logger.debug("Passport initializing.....");
        this.app.use(PassportMiddleware.initialize());
		this.logger.debug("Passport initialized.");

        this.logger.debug("Passport session.....");
        this.app.use(PassportMiddleware.session());
		this.logger.debug("Passport session configured.");
	}
}
