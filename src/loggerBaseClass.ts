import { LoggerFactory } from "./Utils/LoggerFactory";
import * as Winston from "winston";

export class LoggerBaseClass {
	protected Logger: Winston.LoggerInstance;

	constructor() {
		this.Logger = LoggerFactory.Logger();
	}
}
