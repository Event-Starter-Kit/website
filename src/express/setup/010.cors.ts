import * as Interfaces from "../../interfaces";
import { Application} from "express";
import * as cors from "cors";
import { HostingEnvironment }  from "../../utils/hostingEnvironment";

export class CorsMiddleware extends Interfaces.ConfigurationModule<Application> {
	constructor(app: Application) {
		super(app, HostingEnvironment.isDevelopment());
	}

	public setup() {
		this.logger.debug("Enabling CORS");

		let corsOptions = {
			origin: "*",
			methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
			credentials: true,
			preflightContinue: true,
		};

		this.app.use(cors(corsOptions));
	}
}
