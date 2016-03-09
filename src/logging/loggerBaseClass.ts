import { LoggerFactory } from "./loggerFactory";
import * as Winston from "winston";

export class LoggerBaseClass {
	protected logger: Winston.LoggerInstance;

	constructor() {
		this.logger = LoggerFactory.logger();
	}
}
