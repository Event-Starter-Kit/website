import { loggerFactory } from './utils/loggerFactory'
import * as winston from 'winston';

export class loggerBaseClass {
	protected logger: winston.LoggerInstance;

	constructor() {
		this.logger = loggerFactory.logger();
	}
}