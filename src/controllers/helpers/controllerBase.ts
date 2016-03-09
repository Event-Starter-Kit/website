import { LoggerBaseClass } from "../../logging/loggerBaseClass";
import { ViewModelBase } from "../viewModels/viewModelBase";
import { Configuration } from "../../data/models/configuration";
import * as express from "express";

export class ControllerBase extends LoggerBaseClass {
	protected app: express.Express;
	protected configuration: Configuration;

	constructor(app: express.Express, configuration: Configuration) {
		super();

		this.app = app;
		this.configuration = configuration;
	}

	protected isLoggedIn(req: express.Request, res: express.Response, next: express.NextFunction): void {
		if (req.isAuthenticated()) {
			return next();
		}

		res.sendStatus(401);
	}

	protected populateModel(model: ViewModelBase): void {
		model.Configuration = this.configuration;
	}
}
