import { Environment } from "../../config/environment";
import { WebsiteConfiguration } from "../../config/websiteConfiguration";
import * as express from "express";

export class ModelBase {
	public config: WebsiteConfiguration;
	public csrfToken: string;
	public livereload: boolean;

	constructor(req: express.Request) {
		this.livereload = Environment.IsDevEnvironment();
		this.csrfToken = req.csrfToken();
	}
}
