import * as Interfaces from "../interfaces";

export class SampleJob extends Interfaces.ConfigurationCronJob {
	constructor() {
		super();
		this.enabled = false;
		this.name = "SampleJob";
		this.cronPattern = "0 0 1 * *"; // "*/30 * * * * *" every 30 seconds;
	}

	public run() {
		this.logger.debug("Sample Job is running.......");
	}
}
