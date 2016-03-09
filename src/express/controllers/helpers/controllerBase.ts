import { ViewModelBase } from "../viewModels/viewModelBase";
import { Configuration } from "../../../data/models/configuration";
import { Interfaces } from "../../interfaces";
import * as Express from "express";

export abstract class ControllerBase extends Interfaces.ConfigurationModule<Express.Application> {
	protected configuration: Configuration;

	constructor(app: Express.Application, configuration: Configuration, enable: boolean) {
		super(app, enable);

		this.configuration = configuration;
	}

	protected isLoggedIn(req: Express.Request, res: Express.Response, next: Express.NextFunction): void {
		if (req.isAuthenticated()) {
			return next();
		}

		res.sendStatus(401);
	}

	protected populateModel(model: ViewModelBase): void {
		model.Configuration = this.configuration;
	}

	public setup() {
		this.configureRoutes();
	}

	public abstract configureRoutes(): void;
}
