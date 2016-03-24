import * as Express from "express";
import { RouteBase } from "./helpers/routeBase";
import {Configuration} from "../../data/models/configuration";
import { HostingEnvironment } from "../../utils/hostingEnvironment";

export class Errors extends RouteBase {
	constructor(app: Express.Application, configuration: Configuration) {
        super(app, configuration, true);
	}

	public configureRoutes() {
		this.logger.debug("Configuring 404 page");
		this.app.use((req: Express.Request, res: Express.Response) => {
            this.logger.debug("Unable to locate the specified url: " + req.url);
            res.status(404).json({ Message: "404 - NotFound" });
        });

		this.logger.debug("Configuring 500 page");
        this.app.use((err: any, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            this.logger.error(err);

			let responseMessage = { message: HostingEnvironment.isDevelopment ? err.stack : "500 - Internal Server Error" };

			res.status(500).json({ error: responseMessage });

        });
	}
}
