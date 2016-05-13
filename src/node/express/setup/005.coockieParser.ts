import * as Interfaces from "../../interfaces";
import { Application} from "express";
import * as expressCookiParser from "cookie-parser";

export class CookieParser extends Interfaces.ConfigurationModule<Application> {
	constructor(app: Application) {
		super(app, true);
	}

	public setup() {
		this.logger.debug("Enabling cookie parser....");
        this.app.use(expressCookiParser());
		this.logger.debug("Cookie parser configured.");
	}
}
