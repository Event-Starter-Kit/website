import { Interfaces } from "../interfaces";
import { Application} from "express";
const ExpressValidator = require("express-validator");

export class Validation extends Interfaces.ConfigurationModule<Application> {
	constructor(app: Application) {
		super(app, true);
	}

	public setup() {
		this.logger.debug("Enabling validation....");
        this.app.use(ExpressValidator());
		this.logger.debug("Validation configured.");
	}
}
