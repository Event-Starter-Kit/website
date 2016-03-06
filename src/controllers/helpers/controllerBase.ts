import { LoggerBaseClass } from "../../LoggerBaseClass";
import * as express from "express";

export class ControllerBase extends LoggerBaseClass {
	protected app: express.Express;
	constructor(app: express.Express) {
		super();

		this.app = app;
	}

	protected IsLoggedIn(req: express.Request, res: express.Response, next: express.NextFunction) {
		if (req.isAuthenticated()) {
			return next();
		}

		res.sendStatus(401);
	}
}
