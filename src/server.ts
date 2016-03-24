import { LoggerBaseClass } from "./logging/loggerBaseClass";
import { Folder } from "./utils/folder";
import * as Scheduler from "node-schedule";
import * as Express from "express";
import * as Interfaces from "./interfaces";

class Startup extends LoggerBaseClass {
    private app: Express.Application;

    constructor() {
        super();
        this.configureExpress();
		this.configureJobs();
    }

	public run() {
        let port = process.env.PORT || 5000;

        this.app.listen(port, () => {
            this.logger.info("Listening on " + port);
        });
    }

    private configureExpress() {
        try {
			this.logger.debug("Initializing express");
			this.app = Express();

			let module = new Folder().requireAll(__dirname + "/express/setup/");

			module.forEach((exp) => {
				let module = new exp[Object.keys(exp)[0]](this.app);

				if (module.enabled) {
					module.setup();
				}
			});
		} catch (error) {
			this.logger.error("Error configuring Express", error);
		}
    }

	private configureJobs() {
		this.logger.debug("running scheduler....");

		let jobs = new Folder().requireAll(__dirname + "/jobs/");

		this.logger.debug("Found (%s) jobs", jobs.length);

		for (let job of jobs) {
			let module = new job[Object.keys(job)[0]]();
			this.logger.debug("Jobs instance created.");

			if (!module.enabled) {
				continue;
			}

			if (module instanceof Interfaces.ConfigurationCronJob) {
				this.logger.debug("Module enabled, calling setup with cron pattern...");
				Scheduler.scheduleJob(module.cronPattern, () => {
					module.run();
				});
			}

			if (module instanceof Interfaces.ConfigurationScheduledJob) {
				this.logger.debug("Module enabled, calling setup with specific date...");
				Scheduler.scheduleJob(module.date, () => {
					module.run();
				});
			}
		}
	}
}

let srt = new Startup();
srt.run();
