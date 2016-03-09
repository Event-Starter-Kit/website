import * as express from "express";
import { ControllerBase } from "./helpers/controllerBase";
import {Configuration} from "../data/models/configuration";
import { IndexViewModel } from "./viewModels/home/indexViewModel";

export class HomeController extends ControllerBase {
	constructor(app: express.Express, configuration: Configuration) {
        super(app, configuration);

		app.get("/", (req: Express.Request, res: any) => {
			this.logger.debug("Home page....");

			let model = new IndexViewModel();
			this.populateModel(model);

			res.render("Frontoffice/Index", model);
		});
	}
}
