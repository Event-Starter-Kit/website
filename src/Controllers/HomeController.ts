import * as express from "express";
import { ControllerBase } from "./Helpers/ControllerBase";
import {Configuration} from "../Data/Models/Configuration";
import { IndexViewModel } from "./ViewModels/Home/IndexViewModel";

export class HomeController extends ControllerBase {
	constructor(app: express.Express, configuration: Configuration) {
        super(app, configuration);

		app.get("/", (req: Express.Request, res: any) => {
			this.Logger.debug("Home page....");

			let model = new IndexViewModel();
			model.Pippo = "Suka";
			this.PopulateModel(model);

			res.render("Frontoffice/Index", model);
		});
	}
}