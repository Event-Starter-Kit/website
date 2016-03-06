import * as express from "express";
import { ControllerBase } from "./helpers/controllerBase";

export class HomeController extends ControllerBase {
	constructor(app: express.Express) {
        super(app);

		app.get("/", (req: Express.Request, res: any)  => {
			this.Logger.debug("Home page....");
			res.render("Frontoffice/Home", {});
		});
	}
}
