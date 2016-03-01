import { LoggerBaseClass } from "../../loggerBaseClass";
import * as Express from "express";

export class ControllerBase extends LoggerBaseClass {
	protected app: Express.Express;
	constructor(app: Express.Express) {
		super();

		this.app = app;
	}
}
