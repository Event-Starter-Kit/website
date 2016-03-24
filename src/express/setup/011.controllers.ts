import {ConfigurationRepository} from "../../data/repositories/configurationRepository";
import {Configuration} from "../../data/models/configuration";
import { Folder } from "../../utils/folder";
import * as Interfaces from "../../interfaces";
import { Application} from "express";

export class Controllers extends Interfaces.ConfigurationModule<Application> {
	constructor(app: Application) {
		super(app, true);
	}

	public async setup() {

		this.app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});

		let ctrls = new Folder().requireAll(__dirname + "/../routes/");
		let configurationRepository = new ConfigurationRepository();
		let configuration: Configuration;
		try {
			configuration = await configurationRepository
				.getConfiguration();
		} catch (error) {
			this.logger.error(error);
			return;
		}

		ctrls.forEach((ctrl) => {
			let module = new ctrl[Object.keys(ctrl)[0]](this.app, configuration);

			if (module.enabled) {
				module.setup();
			}
        });
	}
}
