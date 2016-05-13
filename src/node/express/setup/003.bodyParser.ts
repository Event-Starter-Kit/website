import * as Interfaces from "../../interfaces";
import { Application} from "express";
const bodyParser = require("body-parser");


export class BodyParser extends Interfaces.ConfigurationModule<Application> {
	constructor(app: Application) {
		super(app, true);
	}

	public setup() {
        this.logger.debug("Setting parse urlencoded request bodies into req.body.");

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));

		this.logger.debug("Body parser configured.");
	}
}
