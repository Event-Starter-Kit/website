import { LoggerBaseClass } from "../../LoggerBaseClass";
import {ViewModelBase} from "../ViewModels/ViewModelBase";
import {Configuration} from "../../Data/Models/Configuration";
import * as express from "express";

export class ControllerBase extends LoggerBaseClass {
	protected App: express.Express;
	protected Configuration: Configuration;

	constructor(app: express.Express, configuration: Configuration) {
		super();

		this.App = app;
		this.Configuration = configuration;
	}

	protected IsLoggedIn(req: express.Request, res: express.Response, next: express.NextFunction) {
		if (req.isAuthenticated()) {
			return next();
		}

		res.sendStatus(401);
	}

	protected PopulateModel(model: ViewModelBase) {
		model.Configuration = this.Configuration;
	}
}
