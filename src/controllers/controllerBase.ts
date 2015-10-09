import { loggerBaseClass } from '../loggerBaseClass';
import * as express from 'express';

export class controllerBase extends loggerBaseClass {
	protected app: express.Express;
	
	constructor(app: express.Express) {
		super();

		this.app = app;
	}
}
