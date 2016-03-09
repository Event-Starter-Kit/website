import { Interfaces } from "../interfaces";
import { Application} from "express";
import * as expressSession from "express-session";
import * as credentials from "../../setup/credentials";

export class Session extends Interfaces.ConfigurationModule<Application> {
	constructor(app: Application) {
		super(app, true);
	}

	public setup() {
		this.logger.debug("Enabling session....");
        this.app.use(expressSession({
            cookie: { maxAge: 3600000 * 12 },
            resave: false,
            saveUninitialized: true,
            secret: credentials.Session.secretPhrase,
            unset: "destroy",
        }));
		this.logger.debug("Session configured.");
	}
}
