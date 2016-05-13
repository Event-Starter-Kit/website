import * as Interfaces from "../../interfaces";
import { Application} from "express";
import * as swig from "swig";
import { Express } from "../../setup/credentials";
import * as Path from "path";

export class ViewEngine extends Interfaces.ConfigurationModule<Application> {
	constructor(app: Application) {
		super(app, true);
	}

	public setup() {
		this.logger.debug("Configuring view engine....");

		this.app.engine("html", swig.renderFile);
		let viewPath = Path.dirname(module.parent.parent.filename) + Express.viewPath;

		this.logger.debug("Configuring view path: " + viewPath);
		this.app.set("view engine", "html");
		this.app.set("views", viewPath);

		this.logger.debug("View engine configured.");
	}
}
