import { Interfaces } from "../interfaces";
import { Application} from "express";
import * as cors from "cors";
import { HostingEnvironment }  from "../../utils/hostingEnvironment";

export class CorsMiddleware extends Interfaces.ConfigurationModule<Application> {
	constructor(app: Application) {
		super(app, HostingEnvironment.isDevelopment());
	}

	public async setup() {
		this.logger.debug("Enabling CORS");

		let corsOptions = {
			origin: "http://localhost:3000",
		};

		this.app.use(cors(corsOptions));
	}
}
