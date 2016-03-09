import { LoggerFactory } from "./utils/loggerFactory";
import * as Winston from "winston";

export class LoggerBaseClass {
	protected Logger: Winston.LoggerInstance;

	constructor() {
		this.Logger = LoggerFactory.Logger();
	}
}
