import { environment } from '../../config/environment';
import { websiteConfiguration } from '../../config/websiteConfiguration';
import * as csrf from 'csurf';
import * as express from 'express';

export class modelBase {
	config: websiteConfiguration;
	csrfToken: string;
	livereload: boolean;

	constructor(req: express.Request) {
		this.livereload = environment.isDevEnvironment();
		this.csrfToken = req.csrfToken();
	}
}
