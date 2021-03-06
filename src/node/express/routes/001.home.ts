import * as express from "express";
import { RouteBase } from "./helpers/routeBase";
import {Configuration} from "../../data/models/configuration";
import { IndexViewModel } from "./viewModels/home/indexViewModel";

export class Home extends RouteBase {
	constructor(app: express.Express, configuration: Configuration) {
        super(app, configuration, true);
	}

	public configureRoutes() {
		this.logger.debug("Configuring routes for Home Controller.");

		this.app.get("/", (req: Express.Request, res: any) => {
			this.logger.debug("Home page....");

			let model = new IndexViewModel();
			this.populateModel(model);

			res.render("frontoffice/index", model);
		});
	}
}
