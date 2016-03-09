import { HostingEnvironment }  from "../config/hostingEnvironment";
import * as winston from "winston";

export class LoggerFactory {
	private static winston: winston.LoggerInstance;
    private static isConfigured: boolean = false;

	public static logger(): winston.LoggerInstance {
        LoggerFactory.configure();
        return LoggerFactory.winston;
    }

    private static configure() {
        if (!this.isConfigured) {
            if (HostingEnvironment.isDevelopment) {
                this.coloredConsole();
            } else {
                this.file();
            }

			this.isConfigured = true;

            LoggerFactory.winston.info("Logger Up & Running....");
        }
    }

    private static file() {
        LoggerFactory.winston = new winston.Logger({
            exitOnError: false,
			transports: [
				new winston.transports.File({
                    colorize: false,
					filename: "./public/logs/all-logs.log",
					handleExceptions: true,
					json: true,
					level: "info",
                    maxFiles: 5,
                    maxsize: 5242880,
                }),
            ],
        });
    }

    private static coloredConsole() {
        LoggerFactory.winston = new winston.Logger({
			exitOnError: false,
            transports: [
                new winston.transports.Console({
					colorize: true,
					handleExceptions: false,
					json: false,
                    level: "debug",
                }),
            ],
        });
    }
}
