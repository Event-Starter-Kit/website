import { LoggerBaseClass } from "../../loggerBaseClass";
import {ViewModelBase} from "../viewModels/viewModelBase";
import {Configuration} from "../../data/models/configuration";
import * as express from "express";

export class ControllerBase extends LoggerBaseClass {
	protected App: express.Express;
	protected Configuration: Configuration;

	constructor(app: express.Express, configuration: Configuration) {
		super();

		this.App = app;
		this.Configuration = configuration;
	}

	protected isLoggedIn(req: express.Request, res: express.Response, next: express.NextFunction) {
		if (req.isAuthenticated()) {
			return next();
		}

		res.sendStatus(401);
	}

	protected populateModel(model: ViewModelBase) {
		model.Configuration = this.Configuration;
	}
}
